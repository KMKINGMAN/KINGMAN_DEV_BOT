const { GiveawaysManager } = require('discord-giveaways'),
GiveAwayModal = require('../../Modals/Give Aways/Main'),
KingmanGiveAways = class extends GiveawaysManager{
    async getAllGiveaways() {
        return await GiveAwayModal.find({});
    }
    async saveGiveaway(messageID, giveawayData) {
        await GiveAwayModal.create(giveawayData);
        return true;
    }
    async editGiveaway(messageID, giveawayData) {
        await GiveAwayModal.findOneAndUpdate({ messageID: messageID }, giveawayData).exec();
        return true;
    }
    async deleteGiveaway(messageID) {
        await GiveAwayModal.findOneAndDelete({ messageID: messageID }).exec();
        return true;
    }
}
/**
 * Thank You Androz :) 
 * I Can Make GiveAways Commands in Mongodb but i like Androz#2091 pkg 
 * in npm :) Thx
 */
module.exports = {
  KingmanGiveAways
}