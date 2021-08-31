const { Schema, model } = require('mongoose');
const users = Schema({
    expireAt: {
        type: Date,
        default: Date.now,
        expires: '1d',
    },
    UserID: {
        type: String,
        required: true
    },
    GuildID: {
        type: String,
        required: true
    },
    rolecreate: {
        type: Number,
        default: 0,
    },
    roledelete: {
        type: Number,
        default: 0,
    },
    channelcreate: {
        type: Number,
        default: 0,
    },
    channeldelete: {
        type: Number,
        default: 0,
    },
    banlimit: {
        type: Number,
        default: 0,
    },
    kicklimit: {
        type: Number,
        default: 0,
    }
    
});
module.exports = model('saftyusers', users);
