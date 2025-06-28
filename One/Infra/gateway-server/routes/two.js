import express from 'express';
const router = express.Router();

// Health check middleware
router.use((req, res, next) => {
  console.log(`[TWO] ${req.method} ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
});

router.get('/', (req, res) => {
  res.send('🟢 Two is live!');
});

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'two', time: new Date().toISOString() });
  });

export default router;