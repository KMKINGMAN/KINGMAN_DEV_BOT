const GuildOps = require('../../Modals/safty/proticton-setup'),
UserOps = require('../../Modals/safty/protiction-users'),
kingman = require('../../km-handler/index')
module.exports = {
	name: 'guildBanAdd',
  async execute(guild, User, client) {
    try{
      if (User.id === client.user.id) return;
      let member = guild.members.cache.get(User.id)
      const log = await guild
      .fetchAuditLogs({
        type: "MEMBER_BAN"
      }).then(audit => audit.entries.first());
      const user = log.executor
      let GuildData, UserData, Data;
      const KINGMAN = new kingman.SAFTY(client)
      GuildData = await GuildOps.findOne({
        GuildID : guild.id
      })
      if(!GuildData){
        GuildData = await GuildOps.create({
          GuildID : guild.id
        })
      }
      UserData = await UserOps.findOne({
        UserID: user.id
      })
      if(!UserData){
        UserData = await UserOps.create({
          UserID: user.id,
          GuildID: guild.id
        })
      }
      if(GuildData.whitelist.includes(user.id)) return;
      let logs = client.channels.cache.get(GuildData.logs)
      let UserLimit =  UserData.banlimit
      let GuildLimiy =  GuildData.banlimit
      let Push = GuildData.punish
      if(UserLimit > GuildLimiy - 1){
        switch(Push){
          case 'ban':
          Data = await KINGMAN.Ban(guild, user)
          if(logs){
            if(Data){
              await KINGMAN.LogSend(guild, "d", logs, user, "Ban Members", Push)
            } else {
              await KINGMAN.LogSend(guild, "n", logs, user, "Ban Members", Push)
            }
          }
          break
          case 'kick':
          Data = await KINGMAN.Kick(guild, user)
          if(logs){
            if(Data){
              await KINGMAN.LogSend(guild, "d", logs, user, "Ban Members", Push)
            } else {
              await KINGMAN.LogSend(guild, "n", logs, user, "Ban Members", Push)
            }
          }
          break
          case 'demote':
          Data = await KINGMAN.Demote(guild, user)
          if(logs){
            if(Data){
              await KINGMAN.LogSend(guild, "d", logs, user, "Ban Members", Push)
            } else {
              await KINGMAN.LogSend(guild, "n", logs, user, "Ban Members", Push)
            }
          }
          break
        }
      } else {
        let UserLimit = await UserOps
        .findOneAndUpdate({
          UserID: user.id,
          GuildID: guild.id
        }, {
          $inc: {
            banlimit: 1
          }
        })
        Data = {
          "pog": UserLimit.banlimit + 1,
          "bruh": GuildData.banlimit
        }
        if(logs){
          await KINGMAN.LogSend(guild, "w", logs, user, "Ban Members", Push, Data)
        }
      }
    }catch(e){
      return
    }

  }
}
