import { CreateAdDto, PatchAdDto } from './ad.dto';
import shortid from "shortid";
import debug from "debug";
import mongooseService from '../common/service/mongoose.service';
import { PermissionFlag } from '../common/enum/permissionflag.enum';

const log: debug.IDebugger = debug('app:in-memory-dao')

class AdDao {
    Schema = mongooseService.getMongoose().Schema
    adSchema = new this.Schema({
        _id: String,
        message: String,
        color: String,
        background: String,
        style: String,
        baittext: String,
        trafficSent: String,
        SocialPageUrl: String,
        signupText: String,
        name: String,
        email: String,
        successMessage: String,
        autoResponder: String,
        type: String,
        fontSize: String
    }, { id: false })
    Ad = mongooseService.getMongoose().model('Ad', this.adSchema)

    constructor() {
        log('Created new instance of UsersDao');
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
        return this.Ad.findOne({ _id: adId }).populate('Ad').exec()
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