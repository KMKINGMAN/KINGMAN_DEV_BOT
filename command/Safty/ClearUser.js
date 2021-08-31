const UserOps = require(`../../Modals/safty/protiction-users`)
module.exports = {
    name: "saftyclear",
    category: "safty",
    usage: [" [MEMBERS]"],
    description : "Clears the security data of a specific person",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      if (kmsg.guild.ownerID !== kmsg.author.id) {
        return await KMSGC.ERR('You Need TO BE \`GUILD_OWNER\`')
      }
      if(!args[0]){
        return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
      }
      let Member = await KMSGC.GetUser(args[0]),
      Data = await UserOps.findOneAndRemove({
        GuildID:kmsg.guild.id,
        UserID:Member.id
      })
      if(!Member){
        return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
      }
      if(!Data){
        return KMSGC.ERR(`This User Dont Have any actions yet.`)
      }
      await KMSGC.SEND(`Done`, `This User Has Been Cleared`)
    }
}