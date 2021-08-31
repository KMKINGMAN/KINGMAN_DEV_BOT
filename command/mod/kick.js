module.exports = {
    name: "kick",
    category: "moderation",
    usage:  [
      "[MEMBERS]",
      "[MEMBERS] <Reason>"
    ],
    description : "kick members",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("KICK_MEMBERS")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`KICK_MEMBERS\` Permissions')
        }
        bp = await KMSGC.PremMe("KICK_MEMBERS")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`KICK_MEMBERS\` Permissions')
        }
        if(!args[0]){
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Member = await KMSGC.GetUser(args[0])
        if(!Member){
            return await KMSGC.ERR('I Cant Find A Member')
        }
        if(Member.roles.highest.position > kmsg.member.roles.highest.position){
            return await KMSGC.ERR('I Cant Kick This Members')
        }
        if(Member === kmsg.member){
            return await KMSGC.ERR('You Cant Kick Yourself')
        }        
        let Reason = args.slice(1).join(" ");
        if(!Member.kickable){
            return await KMSGC.ERR('I Cant Kick This Members')
        }
        let Name = Member.user.tag
        await KMODEC.KICK(Member, Reason)
        await KMSGC.SEND(`Done`,`${Name} Has Been Kicked`)
    }
}