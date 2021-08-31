const GuildOps = require('../../Modals/safty/proticton-setup'),
UserOps = require('../../Modals/safty/protiction-users'),
kingman = require('../../km-handler/index')
module.exports = {
	name: 'channelCreate',
  async execute(channel ,client) {
    try{
      const log = await channel.guild.fetchAuditLogs({
          type: 'CHANNEL_CREATE'
      }).then(audit => audit.entries.first())
      if(!log) return
      const user = log.executor
      if (user.id === client.user.id) return;
      let GuildData, UserData, Data;
      const KINGMAN = new kingman.SAFTY(client)
      GuildData = await GuildOps.findOne({
        GuildID : channel.guild.id
      })
      if(!GuildData){
        GuildData = await GuildOps.create({
          GuildID : channel.guild.id
        })
      }
      UserData = await UserOps.findOne({
        UserID: user.id
      })
      if(!UserData){
        UserData = await UserOps.create({
          UserID: user.id,
          GuildID: channel.guild.id
        })
      }
      if(GuildData.whitelist.includes(user.id)) return;
      let logs = client.channels.cache.get(GuildData.logs)
      let UserLimit =  UserData.channelcreate
      let GuildLimiy =  GuildData.channelcreate
      let Push = GuildData.punish
      if(UserLimit > GuildLimiy - 1){
        switch(Push){
          case 'ban':
          Data = await KINGMAN.Ban(channel.guild, user)
          if(logs){
            if(Data){
              await KINGMAN.LogSend(channel.guild, "d", logs, user, "Channel Create", Push)
            } else {
              await KINGMAN.LogSend(channel.guild, "n", logs, user, "Channel Create", Push)
            }
          }
          break
          case 'kick':
          Data = await KINGMAN.Kick(channel.guild, user)
          if(logs){
            if(Data){
              await KINGMAN.LogSend(channel.guild, "d", logs, user, "Channel Create", Push)
            } else {
              await KINGMAN.LogSend(channel.guild, "n", logs, user, "Channel Create", Push)
            }
          }
          break
          case 'demote':
          Data = await KINGMAN.Demote(channel.guild, user)
          if(logs){
            if(Data){
              await KINGMAN.LogSend(channel.guild, "d", logs, user, "Channel Create", Push)
            } else {
              await KINGMAN.LogSend(channel.guild, "n", logs, user, "Channel Create", Push)
            }
          }
          break
        }
      } else {
        let UserLimit = await UserOps
        .findOneAndUpdate({
          UserID: user.id,
          GuildID: channel.guild.id
        }, {
          $inc: {
            channelcreate: 1
          }
        })
        Data = {
          "pog": UserLimit.channelcreate + 1,
          "bruh": GuildData.channelcreate
        }
        if(logs){
          await KINGMAN.LogSend(channel.guild, "w", logs, user, "Channel Create", Push, Data)
        }
      }
    }catch(e){
      return
    }
 
  }
}
