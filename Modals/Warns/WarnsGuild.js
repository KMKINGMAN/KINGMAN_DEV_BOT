const { Schema, model } = require('mongoose');
const GuildWarnsOps = Schema({
    GuildID:{
        type: String,
        required: true
    },
    Pushment:{
      type : String,
    },
    Log:{
      type : String,
    },
    MaxWarns: {
      type : Number,
      default: 10
    }
});
module.exports = model('Guild Warns Ops', GuildWarnsOps);