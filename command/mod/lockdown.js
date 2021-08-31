module.exports = {
    name: "lockdown",
    category: "moderation",
    usage:  [
      "on",
      "off"
    ],
    description : "lock all server channels",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("MANAGE_CHANNELS")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MANAGE_CHANNELS\`')
        }
        bp = await KMSGC.PremMe("MANAGE_CHANNELS")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`MANAGE_CHANNELS\`')
        }
        let ops = [
            'on',
            'off'
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
        switch (args[0].toLowerCase()) {
            case "on":
            let d = await KMODEC.LOCKDOWN(kmsg.guild,"on")
            return await KMSGC.SEND('Done', 'Locked All The Server')
            break;
            case "off":
            let d2 = await KMODEC.LOCKDOWN(kmsg.guild,"off")
            return await KMSGC.SEND('Done', 'UNLocked All The Server')
            break;
        }

    }
}