import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  isActive: {type: Boolean, required: true, default: false},
  versionClient: {type: String, required: true},
  deviceModel: {type: String, required: true},
  deviceName: {type: String, required: true},
});

export default mongoose.model('dataplayer', schema);
