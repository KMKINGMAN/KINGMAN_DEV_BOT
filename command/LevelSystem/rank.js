const { 
  MessageAttachment
} = require('discord.js'),
KingmanCord = require('canvacord'),
KINGMAN = require('../../km-handler/index'),
KingmanLevel = new KINGMAN.LEVEL()
module.exports = {
    name: "rank",
    category: "level",
    description : "to show rank card",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      let Member = await KMSGC.GetUser(args[0]) || kmsg.member,
      Info = await KingmanLevel
      .Search(Member.user, kmsg.guild);
      if(!Info){
      let xp = Math.floor(Math.random() * 29) + 1,
       NewLevel = await KingmanLevel.AddXp(Member.id, kmsg.guild, xp)
       Info = await KingmanLevel
      .Search(Member.id, kmsg.guild);
      }
      let RankCard = new KingmanCord
      .Rank()
      .setAvatar(Member.user.avatarURL({
            dynamic:true,
            size:2048,
            format: "png"
      }))
      .setRequiredXP(
        (Info.Level+1) * (Info.Level+1) * 100
      )
      .setCurrentXP(Info.Xp)
      .setLevel(Info.Level)
      .setUsername(
        Member
        .user
        .username
      )
      .setProgressBar("#FFF", "COLOR")
      .setDiscriminator(
        Member
        .user
        .discriminator
      )
      .build()
      .then(
        async (KingCardData) =>{
          kmsg.channel.send(
            new MessageAttachment(
              KingCardData,
              "KINGMANRANK.png"
            )  
          )
        }
      )
    }
}