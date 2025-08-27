import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(express.json());

/** READ all posts */
app.get('/posts', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

/** READ post by slug */
app.get('/posts/:slug', async (req, res) => {
  const { slug } = req.params;
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return res.status(404).json({ error: 'Post not found' });
  res.json(data);
});

/** CREATE new post */
app.post('/posts', async (req, res) => {
  const { title, slug, content } = req.body;
  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, slug, content }])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

/** UPDATE post by slug */
app.put('/posts/:slug', async (req, res) => {
  const { slug } = req.params;
  const { title, content } = req.body;

  const { data, error } = await supabase
    .from('posts')
    .update({ title, content })
    .eq('slug', slug)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

/** DELETE post by slug */
app.delete('/posts/:slug', async (req, res) => {
  const { slug } = req.params;

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('slug', slug);

  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send(); // No content
});

app.listen(port, () => {
  console.log(`✅ Posts API running on port ${port}`);
});