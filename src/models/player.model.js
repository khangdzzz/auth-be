import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  username: {type: String, required: true},
  password: {type: String, required: true},
  totalMoney: {type: Number, required: false},
  idDevice: {type: Number, required: true},
  dateLogin: {type: Date, default: null},
});

export default mongoose.model('player', schema);
