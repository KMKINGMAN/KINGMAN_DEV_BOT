const ReactionModal = require('../../Modals/Reaction Role/main'),
{ MessageEmbed } = require("discord.js");
module.exports = {
    name: "reaction-remove",
    category: "reaction role",
    usage:  [" [MESSAGE-ID] [ROLE]"],
    description : "remove reaction role",
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
        if(!args[1]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Role = await KMSGC.GetRole(args[1])
        if(!Role){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        Data = await ReactionModal
        .findOneAndRemove({
          MessageID:args[0],
          Role: Role.id
        })
        if(!Data){
          return await KMSGC.ERR("No Data Found")
        } else {
          return await KMSGC.SEND("Done", ` Removed Data`)
        }
    }
}