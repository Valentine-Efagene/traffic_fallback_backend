import { CreateAdDto, PatchAdDto } from './ad.dto'
import adDao from './ad.dao';
import { CRUD } from '../common/interface/crud.interface';
import debug from 'debug';

const log: debug.IDebugger = debug('app:ad-service');

class AdService implements CRUD {
    async create(resource: CreateAdDto) {
        return adDao.addAd(resource);
    }

    async deleteById(id: string): Promise<any> {
        return adDao.removeAdById(id);
    }

    async list(limit: number, page: number) {
        return adDao.getAds(limit, page);
    }

    async patchById(id: string, resource: PatchAdDto): Promise<any> {
        return adDao.updateAdById(id, resource);
    }

    async readById(id: string) {
        return adDao.getAdById(id);
    }

    async putById(id: string, resource: CreateAdDto) {
        return adDao.updateAdById(id, resource);
    }
}

export default new AdService();