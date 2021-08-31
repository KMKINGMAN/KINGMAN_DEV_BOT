const GuildOps = require('../../Modals/safty/proticton-setup'),
UserOps = require('../../Modals/safty/protiction-users'),
kingman = require('../../km-handler/index')
module.exports = {
	name: 'guildMemberRemove',
  async execute(member ,client) {
    try{
          const Logz = await member.guild.fetchAuditLogs().then(audit => audit.entries.first())
    if(!Logz.action === "MEMBER_KICK") return;
    const log = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_KICK"
        })
        .then(audit => audit.entries.first());
    if(!log){
      return
    }
    const user = log.executor
    if (user.id === client.user.id) return;
    let GuildData, UserData, Data;
    const KINGMAN = new kingman.SAFTY(client)
    GuildData = await GuildOps.findOne({
      GuildID : member.guild.id
    })
    if(!GuildData){
      GuildData = await GuildOps.create({
        GuildID : member.guild.id
      })
    }
    UserData = await UserOps.findOne({
      UserID: user.id
    })
    if(!UserData){
      UserData = await UserOps.create({
        UserID: user.id,
        GuildID: member.guild.id
      })
    }
    if(GuildData.whitelist.includes(user.id)) return;
    let logs = client.channels.cache.get(GuildData.logs)
    let UserLimit =  UserData.kicklimit
    let GuildLimiy =  GuildData.kicklimit
    let Push = GuildData.punish
    if(UserLimit > GuildLimiy - 1){
      switch(Push){
        case 'ban':
        Data = await KINGMAN.Ban(member.guild, user)
        if(logs){
          if(Data){
            await KINGMAN.LogSend(member.guild, "d", logs, user, "Kicked Members", Push)
          } else {
            await KINGMAN.LogSend(member.guild, "n", logs, user, "Kicked Members", Push)
          }
        }
        break
        case 'kick':
        Data = await KINGMAN.Kick(member.guild, user)
        if(logs){
          if(Data){
            await KINGMAN.LogSend(member.guild, "d", logs, user, "Kicked Members", Push)
          } else {
            await KINGMAN.LogSend(member.guild, "n", logs, user, "Kicked Members", Push)
          }
        }
        break
        case 'demote':
        Data = await KINGMAN.Demote(member.guild, user)
        if(logs){
          if(Data){
            await KINGMAN.LogSend(member.guild, "d", logs, user, "Kicked Members", Push)
          } else {
            await KINGMAN.LogSend(member.guild, "n", logs, user, "Kicked Members", Push)
          }
        }
        break
      }
    } else {
      let UserLimit = await UserOps
      .findOneAndUpdate({
        UserID: user.id,
        GuildID: member.guild.id
      }, {
        $inc: {
          kicklimit: 1
        }
      })
      Data = {
        "pog": UserLimit.kicklimit + 1,
        "bruh": GuildData.kicklimit
      }
      if(logs){
        await KINGMAN.LogSend(member.guild, "w", logs, user, "Kicked Members", Push, Data)
      }
    }
    }catch(e){
      return
    }

  }
}
