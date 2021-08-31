const ms = require('ms');
module.exports = {
    name: "grerole",
    category: "giveaway",
    usage: [
      'MessageID'
    ],
    description : "to rerole the giveaway",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("MANAGE_MESSAGES")
        if(!mp === true){
            return await KMSGC.ERR('You Need\`BAN_MEMBERS\`')
        }
        bp = await KMSGC.PremMe("MANAGE_MESSAGES")
        if(!bp === true){
            return await KMSGC.ERR('I Need\`BAN_MEMBERS\`')
        }
        if(isNaN(args[0])){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let giveaway = client.giveawaysManager
        .giveaways
        .find((g) => g.prize === args.join(' ')
        && g.guildID === kmsg.guild.id) || 
        client.giveawaysManager.giveaways
        .find((g) => g.messageID === args[0] 
        && g.guildID === kmsg.guild.id);
        if(!giveaway){
          return KMSGC.ERR("i cant find giveaway")
        }
      client.giveawaysManager.reroll(giveaway.messageID)
      .then(() => {
          message.channel.send('Giveaway rerolled!');
      })
      .catch((e) => {
          if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
              kmsg.channel.send('This giveaway is not ended!');
          } else {
              console.error(e);
              kmsg.channel.send('An error occured...');
          }
      });
    }
}