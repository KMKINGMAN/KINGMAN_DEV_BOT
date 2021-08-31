module.exports = {
    name: "unmute",
    category: "moderation",
    usage:  ["[Member]"],
    description : "unmute memebr",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("MUTE_MEMBERS")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MUTE_MEMBERS\` Permissions')
        }
        bp = await KMSGC.PremMe("MUTE_MEMBERS")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`MUTE_MEMBERS\` Permissions')
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
        let Role = kmsg.guild.roles.cache.find(r => r.name == 'Muted');
        if(!Role){
            kmsg.guild.roles.create({
                data: {
                  name: 'Muted',
                  permissions: []
                }
              })
              let role = kmsg.guild.roles.cache.find(r => r.name == 'Muted');
              kmsg.guild.channels.cache.forEach(c => {
                c.updateOverwrite(role, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                })
              })
        }
        if(!Member){
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        if(!Member.roles.cache.has(Role.id)){
            return await KMSGC.ERR('This Member is\\t Muted')
        }
        await KMODEC.RemoveRole(Member, Role)
        await KMSGC.SEND('Done', Member.user.tag + ' Has Been UnMuted')
    }
}