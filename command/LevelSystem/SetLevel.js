const { 
  MessageEmbed,
  MessageAttachment
} = require('discord.js'),
KIGNAMN = require('../../km-handler/index'),
KingmanLevel = new KIGNAMN.LEVEL()
module.exports = {
    name: "setlevelfor",
    category: "level",
    usage:  [
      '[Member] [Number]'
    ],
    description : "to set level to user",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp, Data, Member;
        mp = await KMSGC.PremM("MANAGE_CHANNELS")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MANAGE_CHANNELS\`')
        }
        bp = await KMSGC.PremMe("MANAGE_CHANNELS")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`MANAGE_CHANNELS\`')
        }
        Member = await KMSGC.GetUser(args[0])
        if(!Member){
          return KMSGC.ERR('i cant find a vaild Member')
        }
        if(!args[0]|| !args[1] || isNaN(args[1])){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        
        Data = await KingmanLevel.SetLevel(Member, kmsg.guild, parseInt(args[1]))
        if(Data){
          await KMSGC.SEND(`Add Level Done`, `${Member} now has ${args[1]} Level`)
        } else {
          await KMSGC.ERR('err db')
        }
        // data = await KingmanLevel.MakeLeader(kmsg.guild, 10)
        // kmsg.channel.send(data.map(d => `<@${d.UserID}> has ${d.Level} and ${d.Xp}`))
        
    }
}