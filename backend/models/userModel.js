import mongoose from 'mongoose';
/*
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);
*/
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: { type: String, required: false },
  cash: { type: Number, default: 0, required: true },

  isAdmin: { type: Boolean, required: true, default: false },
  isSeller : { type: Boolean, required: true, default: false },
  //comment : [commentSchema],
});


const User = mongoose.model('User', userSchema);
export default User;
