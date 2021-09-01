/**
 * ******************************** *
 *  https://github.com/KINGMAN1996  *
 *   https://github.com/KMKINGMAN   *
 *         +962792914245            *
 *   KINGMAN4HACK KINGMAN Server    *
 * *******************************  *   
 */
const { MessageEmbed } = require("discord.js");
class MOD {
  constructor(client, message){
    this.client = client;
    this.message = message;
  }
  /**
   * @description to Ban Members
   * @param {Object} Member discord MEMBER 
   * @param {String} Reason Reason
   * @returns 
   */
  async BAN(Member , Reason){
    let doen = Member.ban({ reason: this.message.author.tag ? this.message.author.tag : "" + Reason ? Reason : "Without Reason" })
    return doen;
  }
  /**
   * @description to UnBan Members
   * @param {Object} Member discord MEMBER 
   * @param {String} Reason Reason
   * @returns 
   */
  async UNBAN(Member , Reason){
      let x2 = false
      let d2;
      let Bans = await this.message.guild.fetchBans()
      let banned = Bans.find(m => m.user.username.toLowerCase() === Member.toLocaleLowerCase()) ||
      Bans.get(Member) ||
      Bans.find(m => m.user.tag.toLowerCase() === Member.toLocaleLowerCase())
      if(banned){
        d2 = banned.user
        let done = await this.message.guild.members.unban(banned.user.id, this.message.author.tag ? this.message.author.tag: "" + Reason ? Reason : "Without Reason" )
        if(done){
        x2 = true
      }
      } else {
        d2 = null
      }
      let x = {
        "user" : d2,
        "banned": x2
      }
      return x;
  }
  /**
   * 
   * @param {Object} Member 
   * @param {String} Reason 
   * @returns 
   */
  async KICK(Member , Reason){
    let doen = await Member.kick({ reason: this.message.author.tag ? this.message.author.tag : "" + Reason ? Reason : "Without Reason" })
    return doen;
  }
  /**
   * 
   * @returns Creat Mute ROle
   */
  async MakeMuteRole(){
    this.message.guild.roles.create({
      data: {
        name: 'Muted',
        permissions: []
      }
    })
    let role = this.message.guild.roles.cache.find(r => r.name == 'Muted');
    return this.message.guild.channels.cache.forEach(c => {
      c.updateOverwrite(role, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    })
  }
  /**
   * @description to add role to user
   * @param {Object} Member Discord Member
   * @param {Object} Role Discord Role
   * @returns 
   */
  async AddRole(Member , Role){
    return Member.roles.add(Role)
  }
  /**
   * @description to remove role from user
   * @param {Object} Member Discord Member
   * @param {Object} Role Discord Role
   * @returns 
   */
  async RemoveRole(Member , Role){
    return Member.roles.remove(Role)
  }
  // async WARN(Member , Reason){
  // }
  // async WARNS(Member){
  // }
  // async CLSWARNS(Member){
  // }
  /**
   * @description to lock Channel
   * @param {Object} Channel Discord Channel
   * @param {Object} Role Discord ROle
   * @returns 
   */
  async LOCK(Channel , Role){
    if(!Role){
      return this.message.guild.roles.cache.forEach(r => {
        Channel.createOverwrite(r ,{
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        })
      })
    } else {
      return Channel.createOverwrite(Role ,{
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    }
  }
  /**
   * @description to unlock channel
   * @param {Object} Channel Discord Channel
   * @param {Object} Role Discord Member
   * @returns 
   */
  async UNLOCK(Channel, Role){
    if(!Role){
      return this.message.guild.roles.cache.forEach(r => {
        Channel.createOverwrite(r ,{
          SEND_MESSAGES: null,
          ADD_REACTIONS: null
        })
      })
    } else {
      return Channel.createOverwrite(Role ,{
        SEND_MESSAGES: null,
        ADD_REACTIONS: null
      })
    }
  }
  /**
   * 
   * @param {Object} Guild Discord Guild
   * @param {String} Options on / off
   * @returns 
   */
  async LOCKDOWN(Guild , Options){
    const channels = Guild.channels.cache.filter(ch => ch.type !== 'category');
    if(Options == 'on'){
      return channels.forEach(c => {
        c.updateOverwrite(Guild.roles.everyone, {
          SEND_MESSAGES: false
        })
      })
    } else if(Options == 'off') {
      return channels.forEach(c => {
        c.updateOverwrite(Guild.roles.everyone, {
          SEND_MESSAGES: null
        })
      })
    }
  }
  // async CLEAR(MsgCount){
  //   if(MsgCount > 100){
  //     return this.message.channel.send(`\`\`\`javascript
  //     i cant delete more than 100 messages 
  //     \`\`\``).then(m => m.delete({ timeout : 5000}))
  //   }
  //   this.message.channel.messages.fetch({limit: 100 }).then(m => m.channel.bulkDelete(MsgCount)).then(m2 => {
  //     this.message.channel.messages(`\`\`\`js
  //     ${m2.size} messages cleared
  //     \`\`\``).then(m4 => m4.delete({ timeout : 5000}))
  //   })
  // }
  /**
   * @description to Voice Kick Member
   * @param {Object} Member 
   * @returns 
   */
  async VKICK(Member){
    return Member.voice.kick();
  }
  /**
   * @description to Voice Mute Member
   * @param {Object} Member 
   * @returns 
   */
  async VMUTE(Member){
    return Member.voice.setMute(true);
  }
  /**
   * @description to Voice unmute Member
   * @param {Object} Member 
   * @returns 
   */
  async UNVMUTE(Member){
    return Member.voice.setMute(false);
  }
  /**
   * @description to voice move member
   * @param {Object} Member 
   * @param {Object} Channel 
   * @returns 
   */
  async MOVE(Member, Channel){
    return Member.voice.setChannel(Channel)
  }
  /**
   * @description To add role to member / all members
   * @param {Object} Member 
   * @param {String} Ops 
   * @param {Object} Role 
   * @returns 
   */
  async ROLE(Member ,Ops , Role){
    if(Ops === 'add'){
      return Member.roles.add(Role.id)
    } else if(Ops === 'remove') {
      return Member.roles.remove(Role.id)
    } else if(Ops === 'addall') {
      return this.message.guild.members.cache.forEach(m => {
        m.roles.add(Role.id)
      })
    } else if(Ops === 'removeall') {
      return this.message.guild.members.cache.forEach(m => {
        m.roles.remove(Role.id)
      })
    }
  }
}
module.exports = {
	MOD
}
