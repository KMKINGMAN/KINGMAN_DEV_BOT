const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "server",
  category: "info",
  description: "To view all Guild information",
  run: async (client, kmsg, args, prefix, KMSGC, KMODEC) => {
    var tch, vch, cc, rc, on, id , dnd, ofl, gid, gct, gown, gmc, reg, blvl ,rolz;
    tch = kmsg.guild.channels.cache.filter(r => r.type === "text").size;
    vch = kmsg.guild.channels.cache.filter(r => r.type === "voice").size;
    cc = kmsg.guild.channels.cache.size;
    rc = kmsg.guild.roles.cache.size;
    on = kmsg.guild.members.cache.filter(m => m.presence.status === 'online').size;
    id = kmsg.guild.members.cache.filter(m => m.presence.status === 'idle').size;
    dnd = kmsg.guild.members.cache.filter(m => m.presence.status === 'dnd').size;
    ofl = kmsg.guild.members.cache.filter(m => m.presence.status === 'offline').size;
    gid = kmsg.guild.id;
    gct = kmsg.guild.createdAt.toLocaleString();
    gown = kmsg.guild.owner;
    gmc = kmsg.guild.memberCount;
    reg = kmsg.guild.region;
    blvl = kmsg.guild.verificationLevel;
    rolz = kmsg.guild.roles.cache.size;
    const kmcodess = new MessageEmbed()
     .setAuthor(kmsg.guild.name, kmsg.author.avatarURL({
        dynamic: true, 
        format: 'png', 
        size: 1024 
     }))
     .addFields({
       name: `** :id: Server ID:**`,
       value: `${gid}`,
       inline:true
     },{
       name: `** :calendar: Created On**`,
       value: `${gct}`,
       inline:true
     },{
       name: `** :crown: Owned by **`,
       value: `${gown}`,
       inline:true
     }
     ,{
       name: `** :busts_in_silhouette:  Members (${gmc}) **`,
       value: `**${on}** Online | **${id}** IDLE \n **${dnd}** DND | **${ofl}** OFFLINE`,
       inline:true
     }
     ,{
       name: `** :speech_balloon: Channels (${cc})**`,
       value: `**${tch}** Text  | **${vch}** Voice`,
       inline:true
     }
     ,{
       name: `**:earth_africa: Others**`,
       value: `**Region: ** ${reg} | **verification: ** ${blvl} `,
       inline:true
     },{
        name: `**:closed_lock_with_key:  Roles (${rolz})**`,
        value: `**${prefix}Roles To See All server Roles**`,
        inline:true
      })
     kmsg.channel.send(kmcodess)
  }
}