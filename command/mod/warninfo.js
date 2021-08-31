const { MessageEmbed } = require("discord.js"),
GuildWarnsOps = require('../../Modals/Warns/WarnsGuild'),
WarnsUser = require('../../Modals/Warns/WarnsUsers'),
Safty = require('../../km-handler/kingman/safty')
module.exports = {
    name: "iwarns",
    category: "moderation",
    usage:  [" [MEMBERS] [Reason]"],
    description : "show all members warns",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp, Data, Data2, User;
        User = await KMSGC.GetUser(args[0]) || kmsg.member
        Data = await WarnsUser.findOne({
          UserID: User.id,
          GuildID: kmsg.guild.id
        })
        if(!Data){
          return console.log(`No Data`)
        }
        if(!Data.Mode){
          return console.log(`No Data Arr`)
        }
        let currentpage = 0,
        ps = await KMSGC.Gen(Data.Mode, User),
        msg = await kmsg.channel.send(`${currentpage+1}/${ps.length}`,ps[currentpage])
        msg.react("⬅️")
        msg.react("➡️")
        msg.react("❌")
        let filter = (reaction, user) => ["⬅️","➡️","❌"].includes(reaction.emoji.name) && (kmsg.author.id === user.id)
        let col = msg.createReactionCollector(filter)
        col.on("collect", async (reaction, user) => {
          if(reaction.emoji.name === '➡️'){
            if(currentpage < ps.length-1){
              currentpage++;
              msg.edit(
                `${currentpage+1}/${ps.length}`,
                ps[currentpage]
              )
            }
          } else if(reaction.emoji.name === '⬅️'){
            if(currentpage != 0){
              --currentpage;
              msg.edit(
              `${currentpage+1}/${ps.length}`,
              ps[currentpage]
              )
            }
          } else if(reaction.emoji.name === '❌') {
            col.stop()
            msg.delete()
          }
        })
    }
}