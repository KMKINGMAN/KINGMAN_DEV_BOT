const {
  MessageAttachment
} = require('discord.js'),
KINGMAN = require('../../km-handler/index'),
Img = new KINGMAN.IMG(),
KingmanLevel = new KINGMAN.LEVEL(),
NumberConverter = require('../../km-handler/kingman/convnum'),
Captcha = KINGMAN.Captcha.default,
UserProfileData = require('../../Modals/Level System/Profile')
module.exports = {
    name: "title",
    category: "general",
    description : "To Change Profile Title",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      let Title = args.join(' '),
      Data;
      if(!Title){
        return KMSGC.ERR('You Need To Write a Title :)')
      }
      Data = await UserProfileData.findOne({
        UserID: kmsg.member.id
      })
      if(!Data){
        Data = await UserProfileData.create({
          UserID: kmsg.member.id
        }).save()
      }
      Data.Title = Title
      Data.save()
          .then(m =>{
          kmsg.react('✅')
          })
          .catch(()=>{
          kmsg.react('❌')
          })
    }
}