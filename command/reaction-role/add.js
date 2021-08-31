const ReactionModal = require('../../Modals/Reaction Role/main'),
{ 
  MessageEmbed,
  Util
} = require("discord.js");
module.exports = {
    name: "reaction-add",
    category: "reaction role",
    usage:  [" [Channel] [MESSAGE-ID] [ROLE] [EMOJIE]"],
    description : "add reaction role",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp, Data;
        mp = await KMSGC.PremM("MANAGE_ROLES")
        if(!mp === true){
          return await KMSGC.ERR('You Need\`MANAGE_ROLES\` Permissions')
        }
        bp = await KMSGC.PremMe("MANAGE_ROLES")
        if(!bp === true){
          return await KMSGC.ERR('You Need\`MANAGE_ROLES\` Permissions')
        }
        if(!args[0]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Channel = await KMSGC.GetChannel(args[0])
        if(!Channel){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        if(!args[1]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let MessageID = client.channels
        .cache.get(Channel.id)
        .messages
        .fetch(args[1])
        if(!MessageID){
          return KMSGC.USAGE(module.exports.name ,
            `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        if(!args[2]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Role = await KMSGC.GetRole(args[2])
        if(!Role){
          return KMSGC.USAGE(module.exports.name ,
            `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        if(!args[3]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        function isCustomEmoji(emoji) {
        return emoji
        .split(":")
        .length == 1 ? false : true;
      }
      if (isCustomEmoji(args[3])){
        let Custom = Util.parseEmoji(args[3])
        let Emojie = client.emojis.cache.get(Custom.id);
        if(!Emojie){
          return KMSGC.ERR('Invilde Emoji')
        }
      
        Data = await ReactionModal.create({
        GuildID: kmsg.guild.id,
        Emoji: Emojie.id,
        Channel: Channel.id,
        MessageID: args[1],
        Role: Role.id
      })
      Data.save()
      .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
      client.channels.cache.get(Channel.id).messages.fetch(args[1]).then(a => {
         a.react(Emojie.id)
      })
      await KMSGC.SEND('Done', `Info\nMessage:[Click Here](https://discord.com/channels/${kmsg.guild.id}/${Channel.id}/${args[1]})\nRole: ${Role}\n Emoji: ${Emojie}`)
      } else {
        Data = await ReactionModal.create({
        GuildID: kmsg.guild.id,
        Emoji: args[3],
        Channel: Channel.id,
        MessageID: args[1],
        Role: Role.id
      })
      Data.save()
      .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        await KMSGC.SEND('Done', `Info\nMessage:[Click Here](https://discord.com/channels/${kmsg.guild.id}/${Channel.id}/${args[1]})\nRole: ${Role}\n Emoji ${args[3]}`)
      }
      client.channels.cache.get(Channel.id).messages.fetch(args[1]).then(a => {
             a.react(args[3])
      })
    }
}