module.exports = {
    name: "lock",
    category: "moderation",
    usage:  [
      "[Channel]",
      "[Channel] <Reason>"
    ],
    description : "lock channels",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("MANAGE_CHANNELS")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MANAGE_CHANNELS\` Permissions')
        }
        bp = await KMSGC.PremMe("MANAGE_CHANNELS")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`MANAGE_CHANNELS\` Permissions')
        }
        let Channel = kmsg.channel
        let Role = await KMSGC.GetRole(args[0])
        if(!Role){
            Role = kmsg.guild.roles.everyone
        }
        await KMODEC.LOCK(Channel, Role)
        await KMSGC.SEND(`${Channel.name} 🔒`, `This Channel Has Been Locked For\n\`${Role.name}\``)
    }
}