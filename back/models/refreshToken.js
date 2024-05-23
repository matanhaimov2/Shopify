const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    user: { type: String, required: true },
});

const RefreshToken = mongoose.model('refreshToken', refreshTokenSchema);
module.exports = RefreshToken;
