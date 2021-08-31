const GuildOps = require('../../Modals/safty/proticton-setup'),
UserOps = require('../../Modals/safty/protiction-users'),
kingman = require('../../km-handler/index')
module.exports = {
	name: 'roleDelete',
  async execute(role ,client) {
    try{
      if (role.managed){
        return
      }
      if(!role){
        return
      }
      const log = await role.guild.fetchAuditLogs({
          type: 'ROLE_DELETE'
      }).then(audit => audit.entries.first())
      if(!log){
        return
      }
      const user = log.executor
      if (user.id === client.user.id) return;
      let GuildData, UserData, Data;
      const KINGMAN = new kingman.SAFTY(client)
      GuildData = await GuildOps.findOne({
        GuildID : role.guild.id
      })
      if(!GuildData){
        GuildData = await GuildOps.create({
          GuildID : role.guild.id
        })
      }
      UserData = await UserOps.findOne({
        UserID: user.id
      })
      if(!UserData){
        UserData = await UserOps.create({
          UserID: user.id,
          GuildID: role.guild.id
        })
      }
      if(GuildData.whitelist.includes(user.id)) return;
      let logs = client.channels.cache.get(GuildData.logs)
      let UserLimit =  UserData.roledelete
      let GuildLimiy =  GuildData.roledelete
      let Push = GuildData.punish
      if(UserLimit > GuildLimiy - 1){
        switch(Push){
          case 'ban':
          Data = await KINGMAN.Ban(role.guild, user)
          if(logs){
            if(Data){
              await KINGMAN.LogSend(role.guild, "d", logs, user, "Deleted Roles", Push)
            } else {
              await KINGMAN.LogSend(role.guild, "n", logs, user, "Deleted Roles", Push)
            }
          }
          break
          case 'kick':
          Data = await KINGMAN.Kick(role.guild, user)
          if(logs){
            if(Data){
              await KINGMAN.LogSend(role.guild, "d", logs, user, "Deleted Roles", Push)
            } else {
              await KINGMAN.LogSend(role.guild, "n", logs, user, "Deleted Roles", Push)
            }
          }
          break
          case 'demote':
          Data = await KINGMAN.Demote(role.guild, user)
          if(logs){
            if(Data){
              await KINGMAN.LogSend(role.guild, "d", logs, user, "Deleted Roles", Push)
            } else {
              await KINGMAN.LogSend(role.guild, "n", logs, user, "Deleted Roles", Push)
            }
          }
          break
        }
      } else {
        let UserLimit = await UserOps
        .findOneAndUpdate({
          UserID: user.id,
          GuildID: role.guild.id
        }, {
          $inc: {
            roledelete: 1
          }
        })
        Data = {
          "pog": UserLimit.roledelete + 1,
          "bruh": GuildData.roledelete
        }
        if(logs){
          await KINGMAN.LogSend(role.guild, "w", logs, user, "Deleted Roles", Push, Data)
        }
      }
    }catch(e){
      return
    }

  }
}
