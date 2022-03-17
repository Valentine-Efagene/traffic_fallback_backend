import { PatchVideoDto } from './video.dto';
import express from 'express';
import videoService from './video.service';
import debug from 'debug';
import adService from './video.service';

const log: debug.IDebugger = debug('app:video-controller');
class UsersController {

    async listVideos(req: express.Request, res: express.Response) {
        const videos = await videoService.list(100, 0);
        res.status(200).send(videos);
    }

    async getVideoById(req: express.Request, res: express.Response) {
        const video = await videoService.readById(req.params.videoId);
        res.status(200).send(video)
    }

    async createVideo(req: express.Request, res: express.Response) {
        const videoId = await videoService.create(req.body);
        res.status(201).send({ id: videoId });
    }

    async patch(req: express.Request, res: express.Response) {
        log(await videoService.patchById(req.params.adId, req.body));
        res.status(204).send(``);
    }

    async removeVideo(req: express.Request, res: express.Response) {
        log(await adService.deleteById(req.params.userId));
        res.status(204).send(``);
    }
}

export default new UsersController();