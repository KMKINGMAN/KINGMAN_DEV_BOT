module.exports = {
    name: "role",
    category: "moderation",
    usage:  [
      "add  [Member] [role]",
      "remove [Member] [role]",
      "addall [Member] [role] ",
      "removeall [Member] [role]"
    ],
    description : "to add and remove role from members",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("MANAGE_ROLES")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MANAGE_ROLES\` Permissions')
        }
        bp = await KMSGC.PremMe("MANAGE_ROLES")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`MANAGE_ROLES\` Permissions')
        }
        ops = [
            'add',
            'remove',
            'addall',
            'removeall'
        ]
        if(!args[0]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        function check(msg, arr) {
            return arr.some(op => op.toLowerCase() === msg.toLowerCase());
        }
        if (check(args[0],ops) === false) {
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Member = await KMSGC.GetUser(args[1])
        if(!Member && args[0] != 'addall' && args[0] != 'removeall'){
            return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Role
        if(!Member && args[0] != 'addall' && args[0] != 'removeall'){
           Role =  await KMSGC.GetRole(args[1])
        } else {
          Role =  await KMSGC.GetRole(args[2])
        }
        
        
        if(!Role){
            return await KMSGC.ERR('I Cant Find a Role')
        }
        switch (args[0]) {
            case "add":
                if(Member.roles.cache.has(Role.id)){
                    return await KMSGC.ERR('This Member Already Has This Role')
                }
                await KMODEC.ROLE(Member,"add", Role)
                await KMSGC.SEND('Added Roles', `${kmsg.author} Added ${Role.name} to ${Member}`)
                break;
        
            case "remove":
                if(!Member.roles.cache.has(Role.id)){
                    return await KMSGC.ERR('This Member Already Has\`t This Role')
                }
                await KMODEC.ROLE(Member,"remove", Role)
                await KMSGC.SEND('Removed Roles', `${kmsg.author} Removed ${Role.name} to ${Member}`)
                break;
            case 'addall':
                kmsg.guild.members.cache.forEach(async (m) => {
                  await KMODEC.ROLE(m,"add", Role)
                })
                await KMSGC.SEND('Added Roles', `${kmsg.author} Added ${Role.name} to everyone`)
                break;
            case 'removeall':
            (async (e) => {
                  await KMODEC.ROLE(e,"remove", Role)
                })
                await KMSGC.SEND('Removed Roles', `${kmsg.author} Removed ${Role.name} to everyone`)
                break;

        }
    }
}