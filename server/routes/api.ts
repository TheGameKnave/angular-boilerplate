import { Request, Response, NextFunction, Router } from 'express';
import { readFeatureFlags } from '../services/featureFlagService';

const router = Router();

// Default route
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({
    message: 'API works',
  });
});

// GET: Fetch feature flags (initial load)
router.get('/flags', (req: Request, res: Response, next: NextFunction) => {
  try {
    const features = readFeatureFlags();
    res.send(features);
  } catch (err) {
    next(err);
  }
});

export default router;
