module.exports = {
    name: "vmute",
    category: "moderation",
    usage:  [" [Member]"],
    description : "mute member in voice channels",
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
        let Member = await KMSGC.GetUser(args[0])
        if(!Member || !args[0]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        if(!Member.voice){
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        try{
          await KMODEC.VMUTE(Member)
        return KMSGC.SEND('Done', Member.user.tag + ' Has Been Voice Muted')
        }catch(err){
           return KMSGC.ERR('Target user is not connected to voice')
        }
        
    }
}