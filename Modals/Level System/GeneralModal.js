const { Schema, model } = require('mongoose');
const Level = Schema({
    GuildID:{
        type: String,
        required: true
    },
    UserID:{
      type: String,
    },
    Xp:{
      type: Number,
      default: 0
    },
    Level:{
      type: Number,
      default: 0
    },
    LastUpdate: {
      type: Date, 
      default: new Date()
    }
});
module.exports = model('Discord Level System', Level);