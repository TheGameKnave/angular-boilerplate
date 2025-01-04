import { Request, Response, NextFunction, Router } from 'express';
const featureFlagService = require('../services/featureFlagService');
const router = Router();

// Default route
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({
    message: 'API works',
  });
});

// GET: Fetch feature flags (initial load)
router.get('/flags', (req: Request, res: Response, next: NextFunction) => {
  res.send(featureFlagService.readFeatureFlags());
});

router.put('/flags', (req: Request, res: Response, next: NextFunction) => {
  featureFlagService.writeFeatureFlags(req.body);
  res.send(featureFlagService.readFeatureFlags());
});

export default router;
