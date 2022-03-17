import express from 'express';
import videoService from './video.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:video-controller')
class VideoMiddleware {
  async validateAdExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const video = await videoService.readById(req.params.videoId);
    if (video) {
      res.locals.video = video
      next();
    } else {
      res.status(404).send({ error: `Video ${req.params.videoId} not found` });
    }
  }
}

export default new VideoMiddleware();