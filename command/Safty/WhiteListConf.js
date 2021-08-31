const GuildOps = require('../../Modals/safty/proticton-setup')
module.exports = {
    name: "wsconfig",
    category: "safty",
    usage: [
      'add',
      'remove',
      'show'
    ],
    description : "add and remove security Whitelist",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      let Data, TempData, Member;
      if (kmsg.guild.ownerID !== kmsg.author.id) {
        return await KMSGC.ERR('You Need TO BE \`GUILD_OWNER\`')
      }
      Data = await GuildOps.findOne({
        GuildID: kmsg.guild.id
      })
      if(!Data){
        Data = await GuildOps.create({
          GuildID: kmsg.guild.id
        })
      }
      Data.save()
      if(!args[0]){
        return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
      }
        function check(msg, arr) {
          return arr.some(op => op.toLowerCase() === msg.toLowerCase());
                }
        if (
          check(args[0],
          module.exports.usage
        ) === false ||
         !args[0]
         ) {
            return await KMSGC.USAGE(
              module.exports.name, 
              prefix+module.exports.name + 
              ` `+module.exports
                 .usage
                 .join(`\n${
                   prefix+module.exports
                   .name + ` `
                 }`)
            )
        }
        switch(args[0].toLowerCase()){
          case'add':
          // prefix + modual.exports.name + user 
          if(!args[1]){
            return await KMSGC.USAGE(
              module.exports.name,
              prefix + module.exports.name + ` [Member]` 
            )
          }
          Member = await KMSGC.GetUser(args[1])
          if(!Member){
            return await KMSGC.USAGE(
              module.exports.name,
              prefix + module.exports.name + ` [Member]` 
            )
          }
          if(Data.whitelist.includes(Member.id)){
            return await KMSGC.ERR(`This Meber Already WhiteListed`)
          }
          TempData = await GuildOps.findOneAndUpdate({
            GuildID: kmsg.guild.id
          }, {
            $push:{
              whitelist: Member.id
            }
          })
          TempData.save()
          .then(m =>{
          kmsg.react('✅')
          })
          .catch(()=>{
          kmsg.react('❌')
          })
          break
          case'remove':
          if(!args[1]){
            return await KMSGC.USAGE(
              module.exports.name,
              prefix + module.exports.name + ` [Member]` 
            )
          }
          Member = await KMSGC.GetUser(args[1])
          if(!Member){
            return await KMSGC.USAGE(
              module.exports.name,
              prefix + module.exports.name + ` [Member]` 
            )
          }
          TempData = await GuildOps.findOneAndUpdate({
            GuildID: kmsg.guild.id
          }, {
            $pull: {
              whitelist: Member.id
            }
          })
          if(!TempData){
            return KMSGC.ERR(`This user is not whitelisted`)
          }
          TempData.save()
          .then(m =>{
          kmsg.react('✅')
          })
          .catch(()=>{
          kmsg.react('❌')
          })
          break
          case'show':
          if(!Data.whitelist[0]){
            return KMSGC.ERR(`I CANT FIND WHITELISTED DATA`)
          }
          let i = 0
          await KMSGC.SEND(`WhiteListed`, `\`${++i}\` <@${Data.whitelist.join(`>\n\`${++i}\` <@`)}>`)
          break
        }
    }
}