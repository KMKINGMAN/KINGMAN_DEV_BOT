const TicketUser = require("../../Modals/Ticket/user")
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "tkunblock",
    category: "ticket",
    usage:  [" <user>"],
    description : "allow someone from creating a ticket again",
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
        if(!args[0]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Member = await KMSGC.GetUser(args[0])
        if(!Member){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Data = await TicketUser.findOneAndUpdate({
          GuildID: kmsg.guild.id,
          UserID: Member.id
        }, {
          $set:{
            Blocked : false
          }
        })
        if(!Data){
          Data = await TicketUser.create({
            GuildID: kmsg.guild.id,
            UserID: Member.id,
            Blocked: false
          })
        }
        Data.save()
        .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        await KMSGC.SEND('Done', `UnBlocked User ${Member}`)
    }
}