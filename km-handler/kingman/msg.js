/**
 * ******************************** *
 *  https://github.com/KINGMAN1996  *
 *   https://github.com/KMKINGMAN   *
 *         +962792914245            *
 *   KINGMAN4HACK KINGMAN Server    *
 * *******************************  *   
 */
const { MessageEmbed } = require("discord.js");
class MSG {
  constructor(client, message){
    this.client = client;
    this.message = message;
  }
  /**
   * @description to get discord member
   * @param {String} User ID
   * @returns Discord Member
   */
  async GetUser(User){
    if(User){
      let usr = this.message.mentions.members.first() || 
      this.message.guild.members.cache.get(User) || 
      this.message.guild.members.cache.find(r => r.user.username.toLowerCase() === User.toLocaleLowerCase()) || 
      this.message.guild.members.cache.find(r => r.displayName.toLowerCase() === User.toLocaleLowerCase())
      return usr;
    } else {
      let usr = this.message.mentions.members.first()
      return usr;
    }
      
  }
  /**
   * @description to get discord Channel
   * @param {String} Channel ID
   * @returns Discord Channel
   */
  async GetChannel(Channel){
    if(Channel) {
      let ch = this.message.mentions.channels.first() ||
       this.message.guild.channels.cache.find(c => c.name == Channel) ||
       this.message.guild.channels.cache.get(Channel)
      return ch;
    } else {
      let ch = this.message.mentions.channels.first()
      return ch;
    }
      
  }
  /**
   * @description to get discord role
   * @param {String} Role id
   * @returns Role
   */
  async GetRole(Role){
      if(Role){
        let rol = this.message.mentions.roles.first() || 
        this.message.guild.roles.cache.get(Role) || 
        this.message.guild.roles.cache.find(r => r.name.toLowerCase() === Role.toLocaleLowerCase()) || 
        this.message.this.guild.roles.cache.get(Role)
        return rol;
      } else {
        let rol = this.message.mentions.roles.first()
        return rol;
      }
  }
  /**
   * @description to chicke Member Premssions
   * @param {String} Prermssion 
   * @returns true / false
   */
  async PremM(Prermssion){
      let status = false;
      if(this.message.member.hasPermission(Prermssion)){
        status = true
      }
      return status;
  }
  /**
   * @description to chicke Client User Premssions
   * @param {String} Prermssion 
   * @returns true / false
   */
  async PremMe(Prermssion){
    let status = false;
    if(this.message.guild.me.hasPermission(Prermssion)){
      status = true
    } 
    return status;
}
/**
 * @description to send Message
 * @param {String} title 
 * @param {String} des 
 */
  async SEND(title , des){
      let send = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor(this.message.author.tag, this.message.author.avatarURL({
        dynamic: true,
        size: 1024 
      }))
      .setTitle(`**\✅ ${title} **`)
      .setDescription(`**${des}**`)
      .setFooter(`Req By ${this.message.author.tag}`, this.message.author.avatarURL({
        dynamic: true,
        size: 1024 
      }))
      this.message.channel.send(send)
  }
  /**
   * @description to send Error Message
   * @param {String} des 
   */
  async ERR(des){
    let err = new MessageEmbed()
    .setColor('YELLOW')
    .setAuthor(this.message.author.tag, this.message.author.avatarURL({
        dynamic: true,
        size: 1024 
    }))
    .setTitle(`**\⚠ Error**`)
    .setDescription(`**\⛔ ${des}**`)
    .setFooter(`Req By ${this.message.author.tag}`, this.message.author.avatarURL({
        dynamic: true,
        size: 1024 
    }))
    this.message.channel.send(err)
  }
  /**
   * @description to send Usage Message
   * @param {String} Command 
   * @param {String} Usage 
   */
  async USAGE(Command , Usage){
      let usgar = new MessageEmbed()
    .setColor('GREEN')
    .setAuthor(this.message.author.tag, this.message.author.avatarURL({
        dynamic: true, 
        size: 1024 
    }))
    .setTitle(`**\🗒️ ${Command} Help**`)
    .setDescription(`**${Usage}**`)
    .setFooter(`Req By ${this.message.author.tag}`, this.message.author.avatarURL({
        dynamic: true, 
        size: 1024 
    }))
    this.message.channel.send(usgar)
  }
  /**
   * @description to generate warns pages
   * @param {Object} WarnsModal 
   * @param {Object} User 
   * @returns 
   */
    async Gen(WarnsModal, User){
    const embeds = [];
    let k = 5;
    for(let i = 0; i < WarnsModal.length; i +=5){
      const newarr = WarnsModal.slice(i, k);
      let j = i
      k += 5;
      const ebc = newarr
      .map(
        c => 
        `**${++j})======\n Reason: \`${c.Reason}\`\nBy: <@${c.By}>**`
      )
      .join('\n')
      const em = new MessageEmbed()
      .setTitle(`**${User.user.tag} Warns**`)
      .setDescription(ebc)
      .setFooter(`Power BY KINGMAN`)
      embeds.push(em)
    }
    return embeds
  }
}
module.exports = {
	MSG
}
