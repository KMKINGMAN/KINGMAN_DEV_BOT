const { MessageEmbed } = require("discord.js"),
ReactionModal = require('../../Modals/Reaction Role/main')
module.exports = {
	name: 'messageReactionRemove',
	async execute(reaction, user, client) {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();
    if(user.bot){
      return
    }
    let Data = await ReactionModal.findOne({
      GuildID:reaction.message.guild.id,
      Emoji: reaction.emoji.id,
      MessageID: reaction.message.id
    })
    if(!Data){
      Data = await ReactionModal.findOne({
      GuildID:reaction.message.guild.id,
      Emoji: reaction.emoji.name,
      MessageID: reaction.message.id
    })
    if(!Data){
      return
    }
    }
    /**
     * Message Embed Section
     */
    let Done;
    Done = new MessageEmbed()
    .setAuthor(
      user
      .username , 
      user.displayAvatarURL()
    )
    .setDescription(`**${
      reaction.message
      .guild.roles
      .cache.get(Data.Role)
      .name
    } Has Been Removed to you on ${
      reaction.message
      .guild.name
    }**`)
    .setFooter(
      reaction.message
      .guild.name , 
      reaction.message
      .guild.iconURL()
    )
    if(Data){
       reaction.message
       .guild.members
       .fetch(user).then(async (member)=>{
         if(member.roles.cache.has(Data.Role)){
           member.roles.remove(Data.Role)
           return user.send(Done)
         }
       })
    }
  }
}