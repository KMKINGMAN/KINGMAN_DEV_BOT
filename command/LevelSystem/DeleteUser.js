const { 
  MessageEmbed,
  MessageAttachment
} = require('discord.js'),
LevelData = require('../../Modals/Level System/GeneralModal')
module.exports = {
    name: "deletelevelfor",
    category: "level",
    usage:  [
      '[Member]'
    ],
    description : "To delete a specific person's level",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp, Data;
        mp = await KMSGC.PremM("MANAGE_CHANNELS")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MANAGE_CHANNELS\`')
        }
        bp = await KMSGC.PremMe("MANAGE_CHANNELS")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`MANAGE_CHANNELS\`')
        }
        if (!args[0]){
          return KMSGC.USAGE(module.exports.name ,
        `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let User = await KMSGC.GetUser(args[0])
        if(!User){
          return KMSGC.ERR('i cant find a member')
        }
        Data = await LevelData.findOneAndRemove({
          UserID: User.id,
          GuildID: kmsg.guild.id,
        }).catch(err => {
          console.log('ERROR + '+ err)
        })
        if(Data){
          kmsg.react('✅')
          await KMSGC.SEND(`Done`, `Deleted Level Data for ${User}`)
        } else {
          kmsg.react('❌')
          await KMSGC.ERR(`UNEXPECTED ERROR`)
        }

        
    }
}