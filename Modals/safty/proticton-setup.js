const { Schema, model } = require('mongoose');
const prot = Schema({
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
    },
    logs: {
        type: String,
    },
    punish: {
        type: String,
        default: "demote",
    },
    whitelist: {
      type: [String],
    }
    
});
module.exports = model('safty', prot);