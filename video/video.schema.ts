import ModelName from "../common/enum/model.name.enum"
import mongooseService from "../common/service/mongoose.service"

const Schema = mongooseService.getMongoose().Schema

const videoSchema = new Schema({
  _id: String,
  video_img: String,
  brand_img: String,
  message: { type: String, ref: ModelName.AD }
}, { id: false })

export default videoSchema