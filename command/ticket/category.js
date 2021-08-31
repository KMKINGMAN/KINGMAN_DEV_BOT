const TicketSetUp = require('../../Modals/Ticket/guild')
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "settkcat",
    category: "ticket",
    usage:  [" [Category]"],
    description : "to set category tickets",
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
        let Channel = await KMSGC.GetChannel(args[0])
        if(!Channel || !Channel.type === 'category'){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` `+module.exports.usage.join(`\n${prefix+module.exports.name} `))
        }
        let Data = await TicketSetUp.findOneAndUpdate({
          GuildID: kmsg.guild.id
        }, {
          $set: {
            Category: Channel.id
          }
        })
        if(!Data){
          Data = await TicketSetUp.create({
            GuildID: kmsg.guild.id,
            Category: Channel.id
          })
        }
        Data.save()
        .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        await KMSGC.SEND('Set Ticket Category Done', `Category : \`${Channel.name}\``)
        
    }
}