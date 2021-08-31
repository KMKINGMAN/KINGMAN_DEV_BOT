const { MessageEmbed } = require('discord.js'),
DataModal = require("../../Modals/Welcomer/MainModal");
module.exports = {
    name: "welcomer",
    category: "Welcomer",
    usage: [
      "show",
      "setchannel [Channel]",
      "enable",
      "disable",
      "test [Member]"
    ],
    description : "to edit welcomer Configration",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      let Data,
      ops = [
      "show",
      "setchannel",
      "enable",
      "disable",
      "test"
      ]
      if(!args[0]){
        return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` `+module.exports.usage.join(`\n${prefix+module.exports.name} `))
      }
      function check(msg, arr) {
          return arr.some(op => op.toLowerCase() === msg.toLowerCase());
      }
      if (check(args[0],ops) === false || !args[0]) {
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+module.exports.usage)
      }
      switch(args[0].toLowerCase()){
        case 'show':
        Data = await DataModal.findOne({
          GuildID: kmsg.guild.id
        })
        if(!Data){
          Data = await DataModal.create({
            GuildID: kmsg.guild.id
          })
          Data.save()
        }
        await KMSGC.SEND(`Welcomer Info`, `Channel: <#${Data.Log? Data.Log: "Null"}>\nStatus: ${Data.Status}`)
        break;
        case 'setchannel':
        let Channel = await KMSGC.GetChannel(args[1]? args[1]:"")|| kmsg.channel;
        Data = await DataModal.findOneAndUpdate({
          GuildID: kmsg.guild.id
        }, { 
          $set: {
            Log: Channel.id,
            Status: true
          }
        })
        if(!Data){
          Data = await DataModal.create({
            GuildID: kmsg.guild.id,
            Log: Channel.id,
            Status: true
          })
          }
          Data.save()
          .then(m =>{
          kmsg.react('✅')
          })
          .catch(()=>{
          kmsg.react('❌')
          })
        
        break;
        case 'enable':
        Data = await DataModal.findOneAndUpdate({
          GuildID: kmsg.guild.id,
        },{
          $set:{
            Status: true
          }
        })
        if(!Data){
          Data = await DataModal.create({
            GuildID: kmsg.guild.id,
            Status: true
          })
        }
        Data.save()
          .then(m =>{
          kmsg.react('✅')
          })
          .catch(()=>{
          kmsg.react('❌')
          })
        break;
        case 'disable':
        Data = await DataModal.findOneAndUpdate({
          GuildID: kmsg.guild.id,
        },{
          $set:{
            Status: false
          }
        })
        if(!Data){
          Data = await DataModal.create({
            GuildID: kmsg.guild.id,
            Status: false
          })
        }
        Data.save()
          .then(m =>{
          kmsg.react('✅')
          })
          .catch(()=>{
          kmsg.react('❌')
          })
        break;
        case 'test':
          let Member = await KMSGC.GetUser(args[1] ? args[1]: "") || kmsg.member
          client.emit('guildMemberAdd',  Member);
        break;
      }
    }
}