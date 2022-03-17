import { CreateVideoDto, PatchVideoDto } from './video.dto';
import shortid from "shortid";
import debug from "debug";
import mongooseService from '../common/service/mongoose.service';
import videoSchema from './video.schema';
import ModelName from '../common/enum/model.name.enum';

const log: debug.IDebugger = debug('app:in-memory-video-dao')

class VideoDao {
    Schema = mongooseService.getMongoose().Schema
    videoSchema = videoSchema
    Video = mongooseService.getMongoose().model(ModelName.VIDEO, this.videoSchema)

    constructor() {
        log('Created new instance of VideoDao');
    }

    async addVideo(videoFields: CreateVideoDto) {
        const videoId = shortid.generate();
        log('Video Fields', videoFields)
        const video = new this.Video({
            _id: videoId,
            ...videoFields,
        })
        log('Video', video)
        await video.save()
        return videoId
    }

    async getVideoById(videoId: string) {
        return this.Video.findOne({ _id: videoId })
            //.populate(ModelName.VIDEO)
            .populate('message').exec()
    }

    async getVideos(limit = 25, page = 0) {
        return this.Video.find()
            .limit(limit)
            .skip(limit * page)
            .exec()
    }

    async updateVideoById(
        videoId: string,
        videoFields: CreateVideoDto | PatchVideoDto
    ) {
        const existingVideo = await this.Video.findOneAndUpdate(
            { _id: videoId },
            { $set: videoFields },
            { new: true }
        )

        return existingVideo
    }

    async removeVideoById(videoId: string) {
        return this.Video.deleteOne({ _id: videoId }).exec()
    }
}

export default new VideoDao()