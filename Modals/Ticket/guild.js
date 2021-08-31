const { Schema, model } = require('mongoose');
const TKGuild = Schema({
    GuildID:{
        type: String,
        required: true
    },
    TicketID:{
      type : [String],
    },
    Role:{
      type : [String],
    },
    Total:{
        type : Number,
        default: 0
    },
    Category: {
      type: String,
    },
    ActiveTicket: {
      type : [String]
    }
});
module.exports = model('Ticket Guild Ops', TKGuild);