import { CreateAdDto, PatchAdDto } from './ad.dto';
import shortid from "shortid";
import debug from "debug";
import mongooseService from '../common/service/mongoose.service';
import adSchema from './ad.schema';
import ModelName from '../common/enum/model.name.enum';

const log: debug.IDebugger = debug('app:in-memory-dao')

class AdDao {
    Schema = mongooseService.getMongoose().Schema
    adSchema = adSchema
    Ad = mongooseService.getMongoose().model(ModelName.AD, this.adSchema)

    constructor() {
        log('Created new instance of AdDao');
    }

    async addAd(adFields: CreateAdDto) {
        const adId = shortid.generate();
        const ad = new this.Ad({
            _id: adId,
            ...adFields,
        })
        await ad.save()
        return adId
    }

    async getAdById(adId: string) {
        return this.Ad.findOne({ _id: adId }).populate(ModelName.AD).exec()
    }

    async getAds(limit = 25, page = 0) {
        return this.Ad.find()
            .limit(limit)
            .skip(limit * page)
            .exec()
    }

    async updateAdById(
        adId: string,
        adFields: CreateAdDto | PatchAdDto
    ) {
        const existingAd = await this.Ad.findOneAndUpdate(
            { _id: adId },
            { $set: adFields },
            { new: true }
        )

        return existingAd
    }

    async removeAdById(adId: string) {
        return this.Ad.deleteOne({ _id: adId }).exec()
    }
}

export default new AdDao();