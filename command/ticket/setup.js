const TicketSetUp = require('../../Modals/Ticket/guild')
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "setup",
    category: "ticket",
    usage:  [" [Channel] [Title]"],
    description : "to make ticket channel",
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
        let tkch = await KMSGC.GetChannel(args[0])
        if(!tkch){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` `+module.exports.usage.join(`\n${prefix+module.exports.name} `))
        }
        let TkMsg = new MessageEmbed()
        .setTitle(args[1] ? args[1] : "Ticket")
        .setDescription('To create a ticket react with 📩')
        .setColor("GREEN")
        let MsgID = await tkch.send(TkMsg)
        MsgID.react('📩')
        let Data = await TicketSetUp.findOneAndUpdate({
          GuildID: kmsg.guild.id
        }, {
          $push: {
            TicketID: MsgID.id
          }
        })
        if(!Data){
          Data = await TicketSetUp.create({
            GuildID: kmsg.guild.id,
            TicketID: MsgID.id
          })
        }
        await Data.save()
        .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        await KMSGC.SEND('You Make New Ticket', `Channel :${tkch}\nMessage:[Click Here](https://discord.com/channels/${kmsg.guild.id}/${tkch.id}/${MsgID.id})\nTitle: ${args[1] ? args[1] : "Ticket"}\nBy: ${kmsg.author}`)
    }
}