const { Schema, model } = require('mongoose');
const TKGuild = Schema({
    GuildID:{
        type: String,
        required: true
    },
    UserID:{
      type : String,
      required: true
    },
    Blocked:{
      type : Boolean,
      default: false
    },
    Active:{
      type : Boolean,
      default: false
    },
    Act:{
      type : String,
    }
});
module.exports = model('Ticket User Ops', TKGuild);