const { 
  MessageAttachment
} = require('discord.js'),
LevelData = require('../../Modals/Level System/GeneralModal')
module.exports = {
    name: "searchbylvl",
    category: "level",
    usage:  [
      '[level]'
    ],
    description : "Shows you a list of people who have a certain level",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      if(!args[0]) return KMSGC.USAGE(module.exports.name ,
        `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``);
      if(isNaN(args[0])) return KMSGC.USAGE(module.exports.name ,
        `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``);
      let toserch = args[0],
      Data = await LevelData.find({GuildID: kmsg.guild.id, Level : parseInt(args[0])})
      if(Data[0]){
        let i = 1
        let x = Data.map(d=> `${i++}) <@${d.UserID}>`)
        return await KMSGC.SEND(`Members Has Level ${args[0]}`, x.join('\n'))
      } else {
        return await KMSGC.ERR('Sorry I can not find an one who have level '+ args[0])
      }
    }
}