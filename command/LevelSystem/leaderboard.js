const { 
  MessageAttachment
} = require('discord.js'),
KINGMAN = require('../../km-handler/index'),
KingmanLevel = new KINGMAN.LEVEL()
module.exports = {
    name: "leaderboard",
    category: "level",
    description : "To view top 10 active members",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      await KingmanLevel.MakeLeader(kmsg.guild).then(async d =>{
        let i = 1;
        let x = d.map(
          data => `${i++}) <@${data.UserID}> Level:\`${data.Level}\` Xp: \`${data.Xp}\``
        ).join('\n')
        await KMSGC.SEND(`LeaderBoard`, x)
      })
    }
}