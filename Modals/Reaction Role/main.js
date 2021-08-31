const { Schema, model } = require('mongoose');
const ReactionRole = Schema({
    GuildID:{
        type: String,
        required: true
    },
    Emoji : {
      type: String,
    },
    MessageID:{
      type: String,
    },
    Role:{
      type: String,
    },
    Channel:{
      type: String,
    }
});
module.exports = model('Reaction Roles List', ReactionRole);