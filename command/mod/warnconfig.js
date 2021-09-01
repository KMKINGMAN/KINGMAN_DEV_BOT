const { MessageEmbed } = require("discord.js");
const GuildWarnsOps = require('../../Modals/Warns/WarnsGuild')
module.exports = {
    name: "wconfig",
    category: "moderation",
    usage:  [
      "setlog",
      "setpush",
      "setmaxwarn",
      "show"
    ],
    description : "warns configration",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp, Data, Data2, log;
        mp = await KMSGC.PremM("BAN_MEMBERS")
        if(!mp === true){
            return await KMSGC.ERR('You Need\`BAN_MEMBERS\` Permissions')
        }
        let ops = [
          "setlog",
          "setpush",
          "setmaxwarn",
          "show"
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
        switch(args[0].toLowerCase()){
          case ops[0].toLowerCase():
          if(!args[1]){
            return
          }
          let Channel = await KMSGC.GetChannel(args[1])
          if(!Channel){
            return
          }
          Data = await GuildWarnsOps
          .findOneAndUpdate({
            GuildID: kmsg.guild.id
          },{
            $set:{
              Log: Channel.id
            }
          })
          if(!Data){
            Data = await GuildWarnsOps
            .create({
              GuildID: kmsg.guild.id,
              Log: Channel.id
            })
          }
          Data.save()
          .then(m =>{
           kmsg.react('✅')
          })
        .catch(()=>{
          kmsg.react('❌')
        })
          break
          case ops[1].toLowerCase():
          let push = [
            "ban",
            "kick",
            "demote"
          ]
          if(!args[1]){
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
          }
          if (check(args[1],push) === false) {
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
          }
          Data = await GuildWarnsOps
          .findOneAndUpdate({
            GuildID: kmsg.guild.id
          },{
            $set:{
              Pushment: args[1].toLowerCase()
            }
          })
          if(!Data){
            Data = await GuildWarnsOps
            .create({
              GuildID: kmsg.guild.id,
              Pushment: args[1].toLowerCase()
            })
          }
          Data.save()
          .then(m =>{
           kmsg.react('✅')
          })
        .catch(()=>{
          kmsg.react('❌')
        })
          break
          case ops[2].toLowerCase():
          if(!args[1]){
            return KMSGC.ERR("Please Write This Commands With Number")
          }
          if(isNaN(args[1])){
            return KMSGC.ERR("Max Warns Must Be A Number")
          }
          if(Number(args[1]) < 1){
            return KMSGC.ERR("Max Warns Must Be < 1")
          }
                    Data = await GuildWarnsOps
          .findOneAndUpdate({
            GuildID: kmsg.guild.id
          },{
            $set:{
              MaxWarns: Number(args[1])
            }
          })
          if(!Data){
            Data = await GuildWarnsOps
            .create({
              GuildID: kmsg.guild.id,
              MaxWarns: Number(args[1])
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
          case ops[3].toLowerCase():
          Data = await GuildWarnsOps.findOne({
            GuildID: kmsg.guild.id
          })
          if(!Data){
            Data = await GuildWarnsOps
            .create({
              GuildID: kmsg.guild.id
            })
            Data.save()
          }
          await KMSGC.SEND('Warns Configs', `Logs: <#${Data.Log}>\nMaxWarns: ${Data.MaxWarns}\nPushment: ${Data.Pushment}`)
          break;
        }
    }
}
