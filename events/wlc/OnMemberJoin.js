const { MessageEmbed, MessageAttachment } = require("discord.js"),
KINGMAN = require('../../km-handler/index'),
Img = new KINGMAN.IMG(),
WlcData = require('../../Modals/Welcomer/MainModal');
module.exports = {
	name: 'guildMemberAdd',
	async execute(member, client) {
    let Data;
    const guild = client.guilds.cache.get(member.guild.id)
    Data = await WlcData.findOne({
      GuildID: guild.id
    })
    if(!Data.Log || Data.Log == "Null" || Data.Status == false) return;
    const log = member.guild.channels.cache.find(ch => ch.id === Data.Log);
    if(!log) return;
    if(member.user.bot) return;
    const cachedInvites = client.invites.get(member.guild.id)
    const newInvites = await member.guild.fetchInvites();
    client.invites.set(member.guild.id, newInvites);
    let usedInvites = newInvites.find(invite => cachedInvites.get(invite.code).uses < invite.uses);
    if(!usedInvites){
      usedInvites = {}
      usedInvites.code = "Vanti Url"
      usedInvites.inviter = member.guild.owner.user
      usedInvites.uses = "Unknow"
    }
      log.send(
        `**Welcome to Our Server**
**Your Number is ${member.guild.members.cache.filter(member => !member.user.bot).size}**
**Invite By: ${usedInvites.inviter ? usedInvites.inviter: ""}**\n**Joined By Code : \`${usedInvites.code ? usedInvites.code : ""}\`**`,
		        new MessageAttachment(await Img.Welcome(member.user.username.length > 10 ? member.user.username.substring(0, 9) + '...' : member.user.username, member.user.avatarURL({      
          dynamic:true,
          size:2048,
          format: "png"
      })), "captcha.jpeg")
      
      )
  }
}