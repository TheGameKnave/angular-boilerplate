import { Request, Response, NextFunction, Router } from 'express';
const router = Router();
let features = { // this wants to eventually live behind a database mock
  'App Version': true,
  'Environment': true,
  'API': true,
  'IndexedDB': true,
}

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({
    message: 'api works'
  });
});

router.get('/flags', (req: Request, res: Response, next: NextFunction) => {
  res.send(features);
});

router.put('/flags', (req: Request, res: Response, next: NextFunction) => {
  features = req.body;
  res.send(features);
});

export default router;