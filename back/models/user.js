const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
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
  cartInfo: {
    type: Array,
    required: true
  },
  role: {
    type: String,
    enum: "user",
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
