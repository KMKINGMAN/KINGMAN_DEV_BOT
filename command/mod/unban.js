module.exports = {
    name: "unban",
    category: "moderation",
    usage:  [" [MEMBERS] <Reason>"],
    description : "to unban members",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("BAN_MEMBERS")
        if(!mp === true){
            return await KMSGC.ERR('You Need\`BAN_MEMBERS\` Permissions')
        }
        bp = await KMSGC.PremMe("BAN_MEMBERS")
        if(!bp === true){
            return await KMSGC.ERR('You Need\`BAN_MEMBERS\` Permissions')
        }
        if(!args[0]){
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Reason = args.slice(1).join(' ');
        let x = await KMODEC.UNBAN(args[0], Reason)
        if(x.banned === true){
          return await KMSGC.SEND(`UnBanned`,`${x.user} has been unbanned by ${kmsg.author}`)
        } else {
          return await KMSGC.ERR('i cant find This Members in bans list')
        }
        
    }
}