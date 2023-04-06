import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  role: {type: String, require: true, default: 'user'},
  createdDate: {type: Date, default: Date.now},
  player: {type: Schema.Types.ObjectId, ref: 'player'},
  dataPlayer: {type: Schema.Types.ObjectId, ref: 'dataplayer'},
});

export default mongoose.model('user', schema);
