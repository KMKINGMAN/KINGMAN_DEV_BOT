const { MessageEmbed } = require("discord.js"),
discord = require("discord.js"),
Level = require('../../Modals/Level System/GeneralModal'),
Profile = require('../../Modals/Level System/Profile')
class KingmanLevel {
  constructor(){
  }
  /**
   * @description
   * Used to add xp to user :)
   * @param {Object} Member Discord Member
   * @param {Object} Guild Discord Guild
   * @param {Number} Xp Xp 
   * @returns 
   */
  async AddXp(Member, Guild, Xp){
    let User = await Level.findOne({
      GuildID: Guild.id,
      UserID: Member.id
    })
    if(!User){
      let New = await Level.create({
        GuildID: Guild.id,
        UserID: Member.id,
        Xp : Xp,
        Level: Math.floor(0.1 * Math.sqrt(Xp))
      })
      await New.save()
      return (Math.floor(0.1 * Math.sqrt(Xp)) > 0);
    }
    User.Xp += parseInt(Xp, 10);
    User.Level = Math.floor(0.1 * Math.sqrt(User.Xp));
    User.LastUpdate = new Date();
    await User.save()
    return (Math.floor(0.1 * Math.sqrt(User.Xp -= Xp)) < User.Level);
  }
  /**
   * @description
   * used to get data form db
   * @param {Object} Member Discord Member 
   * @param {Object} Guild Discord Guild 
   * @returns
   */
  async Search(Member, Guild){
    let Data = await Level.findOne({
      GuildID: Guild.id,
      UserID: Member.id
    })
    if(!Data){
      Data = await Level.create({
      GuildID: Guild.id,
      UserID: Member.id
      })
      Data.save()
      return Data
    }
    return Data
  }
  /**
   * @description
   * used to set user level
   * @param {Object} Member Discord Member 
   * @param {Object} Guild Discord Guild 
   * @param {Number} LVL Discord Level
   * @returns 
   */
  async SetLevel(Member, Guild, LVL){
    let User = await Level.findOne({
      GuildID: Guild.id,
      UserID: Member.id
    })
    if(!User){
      let New = await Level.create({
        GuildID: Guild.id,
        UserID: Member.id,
        Xp : LVL * LVL * 100,
        Level: LVL
      })
      await New.save()
      return New
    }
    User.Level = LVL
    User.Xp = LVL * LVL * 100
    User.LastUpdate = new Date(); 
    await User.save()
    return User
  }
  /**
   * 
   * @param {Object} Guild Discord Guild 
   * @param {Number} limit limite 
   * @returns 
   */
  async MakeLeader(Guild, limit) {
    let users = await Level.find({ GuildID: Guild.id }).sort([['Xp', 'descending']]).exec();

    return users.slice(0, limit ? limit: 10);
  }
  /**
   * @description Useed to add Profile Rank
   * @param {Object} Member Discord Member
   * @param {Number} Rank Discord Rank
   * @returns 
   */
    async AddRank(Member, Rank){
    let User = await Profile.findOne({
      UserID: Member.id
    })
    if(!User){
      let New = await Profile.create({
        UserID: Member.id,
        Rank : Rank,
        Level: Math.floor(0.1 * Math.sqrt(Rank))
      })
      await New.save()
      return (Math.floor(0.1 * Math.sqrt(Rank)) > 0);
    }
    User.Rank += parseInt(Rank, 10);
    User.Level = Math.floor(0.1 * Math.sqrt(User.Rank));
    User.LastUpdate = new Date();
    await User.save()
    return (Math.floor(0.1 * Math.sqrt(User.Rank -= Rank)) < User.Level);
  }
  /**
   * @description Used to Get Profile Rank Data
   * @param {Object} Member Discord Member
   * @returns 
   */
  async GetRank(Member){
    let Data = await Profile.findOne({
      UserID: Member.id
    })
    if(!Data){
    Data = await Profile.create({
      UserID: Member.id
    })
    Data.save()
    return Data
    }
    return Data
  }
  // //////TransFareCredits/////
  // async CreditCh(OldMember, NewMember){
  //   let User1 = await Profile
  //   .findOne({
  //     UserID:OldMember.id
  //   }),
  //   User2 = await Profile
  //   .findOne({
  //     UserID: NewMember.id
  //   })
  //   if(!User1){
  //     User1 = await Profile
  //     .create({
  //       UserID: OldMember.id
  //     }).save()
  //   }
  //   if(!User2){
  //     User2 = await Profile
  //     .create({
  //       UserID: OldMember.id
  //     }).save() 
  //   }
  //   return {
  //     "old": User1,
  //     "new": User2
  //   }

  
  
}
module.exports = {
	KingmanLevel
}