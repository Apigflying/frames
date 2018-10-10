import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  createtime: String,
  authlist: Array
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
