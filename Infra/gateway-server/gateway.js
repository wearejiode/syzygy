import express from 'express';
import one from './routes/one.js';
import two from './routes/two.js';
import three from './routes/three.js';

const app = express();

app.use('/one', one);
app.use('/two', two);
app.use('/three', three);

app.listen(3001, () => console.log('🚪 Gateway listening on port 3001'));