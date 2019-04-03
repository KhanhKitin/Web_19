// user models
// email (uniq)
// password
// fbId
// fistName
// lastName
// avatarUrl
// createdAt
const mongoose = require('mongoose');

const  UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    fbId: {
        type: String,
    },
    fistName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    avatarUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    permissions: [String],
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;