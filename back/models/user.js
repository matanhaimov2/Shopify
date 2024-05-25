const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.verifyPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
