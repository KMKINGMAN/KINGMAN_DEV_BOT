const { Schema, model } = require('mongoose');
const Profile = Schema({
    UserID:{
      type: String,
      required: true
    },
    Rank:{
      type: Number,
      default: 0
    },
    Level:{
      type: Number,
      default: 0
    },
    Credit:{
       type: Number,
       default: 0
    },
    Title:{
      type: String,
      default: "KINGMAN DEV"
    },
    LastDaily: {
      type: Date
    }
});
module.exports = model('Kingman Profile Data', Profile);