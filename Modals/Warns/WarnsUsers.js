const { Schema, model } = require('mongoose');
const WarnsUsers = Schema({
    GuildID:{
        type: String,
        required: true
    },
    UserID:{
      type : String,
    },
    Mode: [{
      Reason: String,
      By: String
    }],
    Total:{
      type : Number,
      default: 0
    }
});
module.exports = model('Guild Warned Users', WarnsUsers);