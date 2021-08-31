module.exports = {
    name: "move",
    category: "moderation",
    usage:  [
      "[Member] [Channel]"
    ],
    description : "Move Member From Voice Channel to others Channel",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("MOVE_MEMBERS")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MOVE_MEMBERS\` Permissions')
        }
        bp = await KMSGC.PremMe("MOVE_MEMBERS")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`MOVE_MEMBERS \` Permissions')
        }
        let Member = await KMSGC.GetUser(args[0])
        if(!Member || !args[0]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Channel = await KMSGC.GetChannel(args[1])
        if(!Channel || !args[1]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        if (!Channel.type === "voice"){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        try {
          await KMODEC.MOVE(Member, Channel)
          await KMSGC.SEND("Moved Done", `${kmsg.author} Moved ${Member.user} to ${Channel.name}`)
        } catch(err){
          await KMSGC.ERR('Mmember Must Be In Vc')
        }
        
    }
}