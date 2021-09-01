/**
 * ******************************** *
 *  https://github.com/KINGMAN1996  *
 *   https://github.com/KMKINGMAN   *
 *         +962792914245            *
 *   KINGMAN4HACK KINGMAN Server    *
 * *******************************  *   
 */
const { MessageEmbed } = require("discord.js");
class KINGMAN {
  constructor(client){
    this.client = client;
  }
  async Demote(Guild, Member){
    return Guild.members.cache.get(Member.id).roles.cache.forEach(role =>{
      Guild.members.cache.get(Member.id).roles.remove(role.id)
      .catch((e) => 0)
    })
  }
  async Ban(Guild, Member){
    return Guild.members.ban(Member.id)
  }
  async Kick(Guild, Member){
    return Guild.members.cache.get(Member.id).kick()
  }
  async LogSend(Guild, Type, Log, User, Case, Push, Data){
    let Message;
    if(Type === "d"){
      Message = new MessageEmbed()
      .setTitle("**KINGMAN SAFTY**")
      .setAuthor(User.tag,
      User.avatarURL({
        dynamic: true,
        size: 1024 
        }))
      .setFooter(
      Guild.name, 
      Guild.iconURL()
      )
      .addField("User", User.tag)
      .addField("Case", Case)
      .addField("Punishment", Push)
      .addField(Push + "ed", "Done")
      Log.send(Message)
    } else if(Type === "n"){
      Message = new MessageEmbed()
      .setTitle("**KINGMAN SAFTY**")
      .setAuthor(User.tag,
      User.avatarURL({
        dynamic: true,
        size: 1024 
        }))
      .setFooter(
      Guild.name, 
      Guild.iconURL()
      )
      .addField("User", User.tag)
      .addField("Case", Case)
      .addField("Punishment", Push)
      .addField(Push + "ed", "No")
      Log.send(Message)
    } else if(Type === "w"){
      Message = new MessageEmbed()
      .setTitle("**KINGMAN SAFTY**")
      .setAuthor(User.tag,
      User.avatarURL({
        dynamic: true,
        size: 1024 
        }))
      .setFooter(
      Guild.name, 
      Guild.iconURL()
      )
      .addField("User", User.tag)
      .addField("Case", Case)
      .addField("Punishment", Push)
      .addField("Times", `${Data.pog || 0} / ${Data.bruh || 0}`)
      Log.send(Message)
    }
  }
}
module.exports = {
	KINGMAN
}
