const { Schema, model, Mixed } = require('mongoose');
const GiveAways_Modal = Schema({
    messageID: String,
    channelID: String,
    guildID: String,
    startAt: Number,
    endAt: Number,
    ended: Boolean,
    winnerCount: Number,
    prize: String,
    messages: {
        giveaway: String,
        giveawayEnded: String,
        inviteToParticipate: String,
        timeRemaining: String,
        winMessage: String,
        embedFooter: String,
        noWinner: String,
        winners: String,
        endedAt: String,
        hostedBy: String,
        units: {
            seconds: String,
            minutes: String,
            hours: String,
            days: String,
            pluralS: Boolean,
        },
    },
    hostedBy: String,
    winnerIDs: [String],
    reaction: Mixed,
    botsCanWin: Boolean,
    embedColor: Mixed,
    embedColorEnd: Mixed,
    exemptPermissions: [],
    exemptMembers: String,
    bonusEntries: String,
    extraData: Mixed,
    lastChance: {
        enabled: Boolean,
        content: String,
        threshold: Number,
        embedColor: Mixed
    }
});
module.exports = model('Discrod GiveAways By KINGMAN', GiveAways_Modal);