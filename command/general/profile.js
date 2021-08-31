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
    name: "profile",
    category: "general",
    usage: [
      "[Member]"
    ],
    description : "display a person's general identification card",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      let Member = await KMSGC.GetUser(args[0] ? args[0]: "") || kmsg.member,
      Info = await KingmanLevel.GetRank(Member),
      name = Member.user.username.length > 10 ? Member.user.username.substring(0, 9) + '...' : Member.user.username;
      kmsg.channel.send({
        files: [
        { attachment: await Img.Profile("https://a.top4top.io/p_2069floep1.png", Member.user
      .avatarURL({      
          dynamic:true,
          size:2048,
          format: "png"
      }), name,
       Info.Level,
        NumberConverter(Info.Credit),
        Info.Rank, 
        Info.Title, 
        (Info.Level+1) * (Info.Level+1) * 100
        ), name: `KINGMANDEV ${Member.user.username}.png` }
      ]
      })
    }
}
