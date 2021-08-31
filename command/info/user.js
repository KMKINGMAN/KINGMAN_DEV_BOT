const moment = require("moment"),
{ MessageEmbed } = require("discord.js");
module.exports = {
    name: "user",
    category: "info",
    usage:  [
      '[Member]',
    ],
    description : "To view all member information",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let Member = await KMSGC.GetUser(args[0])
        if(!Member){
            Member = kmsg.member
        }
        let User = Member.user 
        kmsg.guild.fetchInvites().then(invites  => {
            const userInvites = invites.array().filter(o => o.inviter.id === Member.id);
            var userInviteCount = 0;
             for(var i=0; i < userInvites.length; i++) {
               var invite = userInvites[i];
               userInviteCount += invite['uses'];
             }
             
            moment.locale('en-JO');
            let userInfo  = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(Member.displayName , User.avatarURL({ 
                dynamic: true, 
                size: 1024
             }))
            .addField(`**Joined Discord : \n \`${
                moment(User.createdTimestamp)
                .format('D/MM/YYYY')
            }\`**`, `** ${
                moment(User.createdTimestamp)
                .fromNow()
            }**`, true)
            .addField(`**Joined Server : \n \`${
                moment(Member.joinedAt)
                .format('D/MM/YYYY')
            }\` **`, `** ${
                moment(Member.joinedAt)
                .fromNow()
            }**`, true)
            .addField(`**INVITES: **`, `**${userInviteCount}**`)
            .setThumbnail(User.avatarURL({
                dynamic:true
            }))
            .setFooter(`Req by ${kmsg.author.tag}`,kmsg.author.avatarURL({
                dynamic:true
            }))
            kmsg.channel.send(userInfo)
            
        })
    }
}