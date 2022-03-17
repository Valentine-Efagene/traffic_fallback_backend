import { CreateAdDto, PatchAdDto } from './ad.dto'
import AdDao from './ad.dao';
import { CRUD } from '../common/interface/crud.interface';
import debug from 'debug';

const log: debug.IDebugger = debug('app:ad-service');

class AdService implements CRUD {
    async create(resource: CreateAdDto) {
        return AdDao.addAd(resource);
    }

    async deleteById(id: string): Promise<any> {
        return AdDao.removeAdById(id);
    }

    async list(limit: number, page: number) {
        return AdDao.getAds(limit, page);
    }

    async patchById(id: string, resource: PatchAdDto): Promise<any> {
        return AdDao.updateAdById(id, resource);
    }

    async readById(id: string) {
        return AdDao.getAdById(id);
    }

    async putById(id: string, resource: CreateAdDto) {
        return AdDao.updateAdById(id, resource);
    }
}

export default new AdService();