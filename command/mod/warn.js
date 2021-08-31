const { MessageEmbed } = require("discord.js");
const GuildWarnsOps = require('../../Modals/Warns/WarnsGuild')
const WarnsUser = require('../../Modals/Warns/WarnsUsers')
const Safty = require('../../km-handler/kingman/safty')
module.exports = {
    name: "warn",
    category: "moderation",
    usage:  [" [MEMBERS] [Reason]"],
    description : "warns members",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp, Data, Data2, log;
        KINGMAN = new Safty.KINGMAN(client)
        mp = await KMSGC.PremM("MANAGE_NICKNAMES")
        if(!mp === true){
            return await KMSGC.ERR('You Need\`MANAGE_NICKNAMES\` Permissions')
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
        let Reason = args.slice(1).join(' ')
        if(!Reason){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        Data = await GuildWarnsOps.findOne({
          GuildID: kmsg.guild.id
        })
        if(!Data){
          Data = await GuildWarnsOps.create({
            GuildID: kmsg.guild.id
          })
          Data.save()
        }
        log = client.channels.cache.get(Data.Log)
        Data2 = await WarnsUser
        .findOneAndUpdate({
          GuildID: kmsg.guild.id,
          UserID: Member.id
        },{
          $push : {
            Mode: {
              "Reason": Reason,
              "By": kmsg.author.id
            }
          },
          $inc:{
            Total: 1
          }
        })
        if(!Data2){
          Data2 = await WarnsUser.create({
            GuildID: kmsg.guild.id,
            UserID: Member.id,
            Mode : {
              "Reason": Reason,
              "By": kmsg.author.id
            }
          })
          Data2.save()
        }
        let LogMsg = async (Channel) =>{
          Channel.send(
            new MessageEmbed()
            .setTitle(`**${kmsg.member.displayName} Warned (${Member.displayName})**`)
            .setDescription(`**${Member} This person has been warned for their actions\n(\`${Reason}\`)\n By${kmsg.author}**`)
          )
        }
        let LogMsg2 = async (Channel, Push) =>{
          Channel.send(
            new MessageEmbed()
            .setTitle(`**${kmsg.member.displayName} Warned (${Member.displayName})**`)
            .setDescription(`**${Member} This person has been ${Push + 'ed'}\n By${kmsg.author}**`)
          )
        }
        let LogMsg3 = async (Channel, Push) =>{
          Channel.send(
            new MessageEmbed()
            .setTitle(`**${kmsg.member.displayName} Warned (${Member.displayName})**`)
            .setDescription(`**${Member} This person has\`t ${Push + 'ed'}\n By${kmsg.author}**`)
          )
        }
        let DMU = async (Member, MSG) =>{
          try {
            Member.send(MSG)
          } catch {
            return
          }
          
        }
        //////////////
        if(Data2.Total >= Data.MaxWarns -1){
          if(Data.Pushment){
            switch(Data.Pushment.toLowerCase()){
              case'ban':
              try {
                await KINGMAN.Ban(kmsg.guild, Member)
                if(log){
                  await LogMsg2(log, 'ban')
                }
              } catch(e) {
                if(log){
                  await LogMsg3(log, 'ban')
                }
              }
              break
              case 'kick':
              try {
                await KINGMAN.Kick(kmsg.guild, Member)
                await DMU(Member, `**You Have Warned for \`${Reason}\` By ${kmsg.author.tag}**`)
                if(log){
                 await LogMsg2(log, 'kick')
                 await DMU(Member, `**You Have Warned for \`${Reason}\` By ${kmsg.author.tag}**`)
                }
              } catch(e) {
                if(log){
                 await LogMsg3(log, 'ban')
                 await DMU(Member, `**You Have Warned for \`${Reason}\` By ${kmsg.author.tag}**`)
                }
                await DMU(Member, `**You Have Warned for \`${Reason}\` By ${kmsg.author.tag}**`)
              }
              break
              case 'demote':
              try {
                await KINGMAN.Demote(kmsg.guild, Member)
                if(log){
                 await LogMsg2(log, 'demot')
                }
                await DMU(Member, `**You Have Warned for \`${Reason}\` By ${kmsg.author.tag}**`)                
              } catch(e) {
                if(log){
                 await LogMsg3(log, 'demot')
                }
                await DMU(Member, `**You Have Warned for \`${Reason}\` By ${kmsg.author.tag}**`)
              }
              break
            }
          }
          } else {
            await DMU(Member, `**You Have Warned for \`${Reason}\` By ${kmsg.author.tag}**`)
            if(log){
              await LogMsg(log)
            }
        }
    }
}