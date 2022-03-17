import { PatchAdDto } from './ad.dto';
import express from 'express';
import usersService from './ad.service';
import argon2 from 'argon2';
import debug from 'debug';
import adService from './ad.service';

const log: debug.IDebugger = debug('app:users-controller');
class UsersController {

    async listAds(req: express.Request, res: express.Response) {
        const ads = await adService.list(100, 0);
        res.status(200).send(ads);
    }

    async getAdById(req: express.Request, res: express.Response) {
        const ad = await adService.readById(req.params.adId);
        res.status(200).send(ad);
    }

    async createAd(req: express.Request, res: express.Response) {
        const adId = await adService.create(req.body);
        res.status(201).send({ id: adId });
    }

    async patch(req: express.Request, res: express.Response) {
        log(await adService.patchById(req.params.adId, req.body));
        res.status(204).send(``);
    }

    async removeAd(req: express.Request, res: express.Response) {
        log(await adService.deleteById(req.params.userId));
        res.status(204).send(``);
    }
}

export default new UsersController();