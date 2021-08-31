const { MessageEmbed } = require("discord.js"),
TicketUser = require('../../Modals/Ticket/user'),
TicketSetUp = require('../../Modals/Ticket/guild');
module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction, user, client) {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();
    if(user.bot){
      return
    }
    if(!reaction.emoji.name === '🔐'){
      return
    }
    let Data = await TicketSetUp.findOne({
      GuildID: reaction.message.guild.id
    })
    if(!Data){
      return
    }
   if(
     !Data
     .ActiveTicket
     .includes(
       reaction
       .message
       .channel
       .id
     )
   ){
      return 
    }
    reaction.users.remove(user)
    let UpdateUser = await TicketUser.findOneAndUpdate({
      GuildID: reaction.message.guild.id,
      Act: reaction.message.channel.id
    }, {
      $set: {
        Active: false
      },
      $unset: {
        Act: reaction.message.channel.id
      }
    })
    let DataFinaly = await TicketSetUp.findOneAndUpdate({
      GuildID: reaction.message.guild.id
    }, {
      $pull :{
        ActiveTicket: reaction.message.channel.id
      }
    })
    DataFinaly.save()
    await reaction.message.channel.delete()
  }
}