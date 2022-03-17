import { CreateVideoDto, PatchVideoDto } from './video.dto'
import videoDao from './video.dao';
import { CRUD } from '../common/interface/crud.interface';
import debug from 'debug';

const log: debug.IDebugger = debug('app:video-service');

class VideoService implements CRUD {
    async create(resource: CreateVideoDto) {
        return videoDao.addVideo(resource);
    }

    async deleteById(id: string): Promise<any> {
        return videoDao.removeVideoById(id);
    }

    async list(limit: number, page: number) {
        return videoDao.getVideos(limit, page);
    }

    async patchById(id: string, resource: PatchVideoDto): Promise<any> {
        return videoDao.updateVideoById(id, resource);
    }

    async readById(id: string) {
        return videoDao.getVideoById(id);
    }

    async putById(id: string, resource: CreateVideoDto) {
        return videoDao.updateVideoById(id, resource);
    }
}

export default new VideoService()