const ms = require('ms');
module.exports = {
    name: "gstart",
    category: "giveaway",
    usage: [
      "[Channel] [Time] [NumbeOF Winner] [Prize]",
      "#chat 1d 1 Nitro"
    ],
    description : "to start the giveaway",
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
        if(!args[0] || !args[1] || !args[2] || !args[3]){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        if(isNaN(ms(args[1])) || isNaN(args[2])){
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
        }
        let Channel = await KMSGC.GetChannel(args[1]),
        Time = ms(args[1]),
        NumberOfWinner = parseInt(args[2]),
        Prize = args.slice(3).join(' ');
        client.giveawaysManager.start(Channel,{
          time: Time,
          prize: Prize,
          winnerCount: NumberOfWinner,
          hostedBy: kmsg.author,
          messages: {
            giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded:"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
              seconds: "seconds",
              minutes: "minutes",
              hours: "hours",
              days: "days",
              pluralS: false
            }
        }
      })
    }
}