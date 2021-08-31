const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "avatar",
    category: "info",
    usage:  [
      '[Member]'
    ],
    description : "display a member's picture",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let Member = await KMSGC.GetUser(args[0])
        if(!Member){
          Member = kmsg.member
        }
        let Avatar = new MessageEmbed()
        .setTitle(Member.user.tag)
        .setDescription(`**[Download](${Member.user.avatarURL({
            dynamic:true,
            size:2048
        }) || 'https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3'})**`)
        .setURL(Member.user.avatarURL({
            dynamic:true,
            size:2048
        }) || 'https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3')
        .setImage(Member.user.avatarURL({
            dynamic:true,
            size:2048
        }) || 'https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3')
        .setFooter(`Req By : ${kmsg.author.tag}`,kmsg.author.avatarURL({
            dynamic:true,
            size:2048
        }) || "https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3")
        kmsg.channel.send(Avatar)
    }
}