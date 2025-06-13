-- ./schema.sql
-- Main posts table
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  slug_prefix TEXT,
  created TEXT NOT NULL,
  edited TEXT,
  excerpt TEXT,
  summary_points TEXT, -- store as JSON string or normalized later
  cover TEXT,
  og_image_alt TEXT,
  languages TEXT DEFAULT 'en',
  author TEXT,
  reading_time INTEGER,
  is_series BOOLEAN DEFAULT false,
  series TEXT,
  series_part INTEGER,
  draft BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  dirty BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  visibility TEXT DEFAULT 'public', -- ENUM: public, internal, private
  status TEXT DEFAULT 'draft',      -- ENUM: draft, scheduled, archived, published
  scheduled TEXT,
  layout TEXT,
  indexable BOOLEAN DEFAULT true,
  comments_enabled BOOLEAN DEFAULT true,
  redirect_from TEXT,              -- Store as comma-separated or JSON string
  contributors TEXT,               -- Store as comma-separated or JSON string
  used_ai BOOLEAN DEFAULT false,
  original_prompt TEXT,
  source TEXT DEFAULT 'md',
  canonical TEXT,
  auth_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags (one row per tag)
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

-- Categories (broader than tags)
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

-- Post ↔ Tag relationship
CREATE TABLE post_tags (
  post_id TEXT NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Post ↔ Category relationship
CREATE TABLE post_categories (
  post_id TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (post_id, category_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Helpful Indexes
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_date ON posts(created);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_featured ON posts(featured);
