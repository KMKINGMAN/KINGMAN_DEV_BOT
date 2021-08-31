module.exports = {
    name: "ban",
    category: "moderation",
    usage: [
      "[MEMBERS]",
      "[MEMBERS] <Reason>"
    ],
    description : "ban members",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("BAN_MEMBERS")
        if(!mp === true){
            return await KMSGC.ERR('You Need\`BAN_MEMBERS\` permissions')
        }
        bp = await KMSGC.PremMe("BAN_MEMBERS")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`BAN_MEMBERS\` permissions')
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
        if(Member.roles.highest.position > kmsg.member.roles.highest.position){
            return await KMSGC.ERR('I Cant Ban This Members')
        }
        if(Member === kmsg.member){
            return await KMSGC.ERR('You Cant Ban Yourself')
        }        
        let Reason = args.slice(1).join(" ");
        if(!Member.bannable){
            return await KMSGC.ERR('I Cant Ban This Member')
        }
        let Name = Member.user.tag
        await KMODEC.BAN(Member, Reason)
        await KMSGC.SEND(`Done`,`${Name} Has Been Banned`)
    }
}