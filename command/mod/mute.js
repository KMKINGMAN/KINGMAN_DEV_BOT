module.exports = {
    name: "mute",
    category: "moderation",
    usage:  [" [Member]"],
    description : "mute memebr",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("MUTE_MEMBERS")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MUTE_MEMBERS\` Permissions')
        }
        bp = await KMSGC.PremMe("MANAGE_ROLES")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`MANAGE_ROLES\` Permissions')
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
        if(Member.roles.highest.position > kmsg.member.roles.highest.position){
            return await KMSGC.ERR('I Cant Mute This Members')
        }
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
            return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+module.exports.usage)
        }
        if(Member === kmsg.member){
            return await KMSGC.ERR('You Cant Mute Yourself')
        }
        if(Member.roles.cache.has(Role.id)){
            return await KMSGC.ERR('This Member Already Muted')
        }
        await KMODEC.AddRole(Member, Role)
        await KMSGC.SEND('Done', Member.user.tag + ' Has Been Muted')
        //AddRole

    }
}