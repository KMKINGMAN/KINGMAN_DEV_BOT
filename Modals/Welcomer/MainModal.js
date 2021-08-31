const { Schema, model } = require('mongoose');
const Welcomer = Schema({
    GuildID:{
        type: String,
        required: true
    },
    Log:{
      type : String,
      default: "Null"
    },
    Status:{
      type: Boolean,
      default: false
    }
});
module.exports = model('Welcomer', Welcomer);