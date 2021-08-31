const { 
  MessageEmbed,
  MessageAttachment
} = require('discord.js'),
KIGNAMN = require('../../km-handler/index'),
KingmanLevel = new KIGNAMN.LEVEL()
module.exports = {
    name: "addxpfor",
    category: "level",
    usage:  [
      '[Member] [Number]'
    ],
    description : "to add xp to user",
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
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        if(!args[0]|| !args[1] || isNaN(args[1])){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        
        Data = await KingmanLevel.AddXp(Member, kmsg.guild, parseInt(args[1]))
        if(Data){
          await KMSGC.SEND(`Add Level Done`, `${Member} now has ${args[1]} xp`)
        } else {
          await KMSGC.ERR('err db')
        }
        
    }
}