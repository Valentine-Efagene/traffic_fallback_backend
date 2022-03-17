import mongooseService from "../common/service/mongoose.service"

const Schema = mongooseService.getMongoose().Schema

const adSchema = new Schema({
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

export default adSchema