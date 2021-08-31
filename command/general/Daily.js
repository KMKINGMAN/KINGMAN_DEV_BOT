const {
  MessageAttachment
} = require('discord.js'),
KINGMAN = require('../../km-handler/index'),
Img = new KINGMAN.IMG(),
KingmanLevel = new KINGMAN.LEVEL(),
NumberConverter = require('../../km-handler/kingman/convnum'),
Captcha = KINGMAN.Captcha.default,
UserProfileData = require('../../Modals/Level System/Profile')
ms = require('ms')
module.exports = {
    name: "daily",
    category: "general",
    description : "to get daily credit's",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      let timeout = 86400000,
      amount = Math.floor(Math.random() * 400),
      data = await UserProfileData.findOne({
        UserID: kmsg.author.id
      })
      if(!data){
         data = await UserProfileData.create({
           UserID: kmsg.author.id
         }).save()
      }
      if (timeout - (Date.now() - data.LastDaily) > 0) {
      
      let times = ms(timeout - (Date.now() - data.LastDaily));
      return kmsg.channel.send(`**You have to wait a while \`${times}\` To receive the Daily**`)
      }else{
      data.Credit = data.Credit + amount
      data.LastDaily = Date.now()
      data.save()
      kmsg.channel.send("**💰 | You have received " + `$\`${amount}\` From Daily **`)
      }
    }
}