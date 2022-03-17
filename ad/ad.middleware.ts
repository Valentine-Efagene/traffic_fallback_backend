import express from 'express';
import adService from './ad.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');
class AdMiddleware {
  async validateAdExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const ad = await adService.readById(req.params.userId);
    if (ad) {
      res.locals.ad = ad;
      next();
    } else {
      res.status(404).send({ error: `User ${req.params.userId} not found` });
    }
  }
}

export default new AdMiddleware();