const { 
  MessageEmbed,
  MessageAttachment
} = require('discord.js'),
LevelData = require('../../Modals/Level System/GeneralModal')
module.exports = {
    name: "restguild",
    category: "level",
    description : "To delete all user rank/xp data in the server",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp, Data;
        mp = await KMSGC.PremM("MANAGE_CHANNELS")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MANAGE_CHANNELS\`')
        }
        bp = await KMSGC.PremMe("MANAGE_CHANNELS")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`MANAGE_CHANNELS\`')
        }
        let DeleteData = await LevelData.deleteMany({GuildID: kmsg.guild.id})
        await KMSGC.SEND('Done', 'Rest Guild Level')
    }
}