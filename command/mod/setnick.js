module.exports = {
    name: "nick",
    category: "moderation",
    usage:  ["[Member] + <Nick>"],
    description : "to set nick members",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("MANAGE_NICKNAMES")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MANAGE_NICKNAMES\` Permissions')
        }
        bp = await KMSGC.PremMe("MANAGE_NICKNAMES")
        if(!bp === true){
            return await KMSGC.ERR('You Need \`MANAGE_NICKNAMES\` Permissions')
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
        let nick = args.slice(1).join(' ');
        if(!nick){
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        if (Member.roles.highest.comparePositionTo(kmsg.guild.me.roles.highest) >= 0) {
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``) 
        }
        await Member.setNickname(nick)
        await  KMSGC.SEND(`Done`, `<@${Member.id}> Nick Has Been Changed to ${nick}`)
    }
}
