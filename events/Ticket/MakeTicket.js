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
    if(!reaction.emoji.name === '📩'){
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
      .TicketID
      .includes(
        reaction
        .message
        .id
      )
    ){
      return
    }
    let UserData = await TicketUser.findOne({
      GuildID: reaction.message.guild.id,
      UserID: user.id
    })
    if(!UserData){
      UserData = await TicketUser.create({
        GuildID: reaction.message.guild.id,
        UserID: user.id
      })
      UserData.save()
    }
    if(UserData.Blocked || UserData.Active){
      return
    }
    reaction.users.remove(user)
    let NewTicket;
    if(Data.Category){
      NewTicket = await reaction.message.guild.channels.create(`Ticket-${Data.Total + 1}`, {
        parent: Data.Category,
        permissionOverwrites:[
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                id: user.id
            },
            {
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                id: reaction.message.guild.id
            }
        ]
      })
    } else {
      NewTicket = await reaction.message.guild.channels.create(`Ticket-${Data.Total + 1}`, {
        permissionOverwrites:[
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                id: user.id
            },
            {
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                id: reaction.message.guild.id
            }
        ]
      })
    }
    if(Data.Role[0]){
      Data.Role.forEach(async Role => {
        NewTicket.createOverwrite(Role, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true
        })
      })
    }
    let TKMsg = new MessageEmbed()
    .setDescription('**To close the ticket react with 🔐**')
    .setColor("GREEN")
    NewTicket.send(TKMsg).then(m=>{
      m.react('🔐')
    })
    let SavaData = await TicketSetUp.findOneAndUpdate({
      GuildID: reaction.message.guild.id
    }, {
      $push: {
        ActiveTicket: NewTicket.id
      },
      $inc: {
        Total: 1
      }
    })
    SavaData.save()
    let AntiTicket = await TicketUser.findOneAndUpdate({
      GuildID: reaction.message.guild.id,
      UserID: user.id
    }, {
      $set: {
        Active: true,
        Act: NewTicket.id
      }
    })
    AntiTicket.save()
  }
}