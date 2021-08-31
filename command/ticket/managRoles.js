const TicketSetUp = require("../../Modals/Ticket/guild")
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "tkrole",
    category: "ticket",
    usage:  [
      "add [Role]",
      "remove [Role]",
      "show [Role]"
    ],
    description : "to manage support ticket roles",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("MANAGE_MESSAGES")
        if(!mp === true){
          return await KMSGC.ERR('You Need\`MANAGE_MESSAGES\` Permissions')
        }
        bp = await KMSGC.PremMe("MANAGE_MESSAGES")
        if(!bp === true){
          return await KMSGC.ERR('You Need\`MANAGE_MESSAGES\` Permissions')
        }
        ops = [
          'add',
          'remove',
          'show'
        ]
        if(!args[0]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        function check(msg, arr) {
            return arr.some(op => op.toLowerCase() === msg.toLowerCase());
        }
        if (check(args[0],ops) === false || !args[0]) {
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Data;
        let Role = await KMSGC.GetRole(args[1])
        if(!Role && !args[0] === 'show'){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+module.exports.usage) 
        }
        switch(args[0].toLowerCase()){
          case 'add':
          Data = await TicketSetUp.findOneAndUpdate({
            GuildID: kmsg.guild.id
          }, {
            $push:{
              Role: Role.id
            }
          })
          if(!Data){
            Data = await TicketSetUp.create({
              GuildID: kmsg.guild.id,
              Role: Role.id
            })
          }
          Data.save()
          .then(m =>{
          kmsg.react('✅')
          })
          .catch(()=>{
          kmsg.react('❌')
          })
          await KMSGC.SEND('Done', `Added New Ticket Support Role ${Role}`)
          break
          case 'remove':
          Data = await TicketSetUp.findOneAndUpdate({
            GuildID: kmsg.guild.id
          }, {
            $pull:{
              Role:Role.id
            }
          })
          if(!Data){
           return KMSGC.ERR('This is Not Ticket Support Roles')
          }
          Data.save()
          .then(m =>{
          kmsg.react('✅')
          })
          .catch(()=>{
          kmsg.react('❌')
          })
          await KMSGC.SEND('Done', `Removed Ticket Support Role ${Role}`)
          break
          case 'show':
          Data = await TicketSetUp.find({
            GuildID: kmsg.guild.id
          })
          if(!Data[0].Role[0]){
            return await KMSGC.ERR('No Data Found')
          }
          await KMSGC.SEND('Support Roles', `- <@&${Data[0].Role.join(`>\n- <@&`)}>`)
          break
        }
    }
}