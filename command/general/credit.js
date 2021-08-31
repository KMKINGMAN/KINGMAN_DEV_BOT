const {
  MessageAttachment
} = require('discord.js'),
KINGMAN = require('../../km-handler/index'),
Img = new KINGMAN.IMG(),
KingmanLevel = new KINGMAN.LEVEL(),
NumberConverter = require('../../km-handler/kingman/convnum'),
Captcha = KINGMAN.Captcha.default,
UserProfileData = require('../../Modals/Level System/Profile')
module.exports = {
    name: "credit",
    category: "general",
    usage: [
      "[Member]",
      "[Member] <Amoute>",
      "[Member] <Amoute> Reason"
    ],
    description : "display or transfer credit's",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      let User1 = kmsg.member,
      User2 = await KMSGC.GetUser(args[0] ? args[0]: ""),
      Balance = args[1];
      if(!User2){
        return await KingmanLevel.GetRank(User1)
        .then(data => {
          kmsg.channel.send(`**🏦 |  ${kmsg.author.username}, your account balance \`$${data.Credit}\`**`)
        })
      } else if(User2 && !Balance) {
        return await KingmanLevel.GetRank(User2)
        .then(data => {
          kmsg.channel.send(`**${User2.user.username} 💳 balance is \`$${data.Credit}\`**`)
        })
      } else if(User2 && Balance){
        if(isNaN(parseInt(Balance))){
          return kmsg.channel.send(`**⁉️ | ${kmsg.author.username}, type the credit you need to transfer!**`)
        }
        let Data1 = await KingmanLevel.GetRank(User1)
        if(Data1.Credit < parseInt(Balance)|| parseInt(Balance) === 0) {
          return kmsg.channel.send(`**:x: | Error , You Don't Have Enough Credit**`)
        } else {
              var tax1 =  parseInt(Balance) * 20;
              var tax3 = Math.floor((Math.floor((parseInt(Balance) * 20) /19)) +1);
              let tax = tax3 - tax1 / 20;
          Cap = new Captcha()
          let msga = await kmsg.channel.send(
            ` **Transfer Fees: \`${tax}\`, Amount: \`$${Balance}\`**
**type these numbers to confirm: **`,
		        new MessageAttachment(Cap.JPEGStream, "captcha.jpeg")
          )
          let collector = kmsg.channel.createMessageCollector(m => m.author.id === kmsg.author.id, { maxMatches: 1, time: 10000 });
          collector.on("collect", async (m) => {
              if (m.content.toUpperCase() === Cap.value) 
              msga.delete({timeout:1000})
              kmsg.channel.send(`**💰 | ${kmsg.author.username}, has transferred \`$${Balance - tax}\` to ${User2}**`);
              User2.send(
    `**\🏧  |  Transfer Receipt\n\`\`\`You have received $${Balance - tax} from user ${kmsg.author.username} (ID: ${User1.id}) \nReason: ${args[2] ? args.slice(2).join(" "): "No reason provided "}
\`\`\`**`
    ).catch(err => 0)
              let D1, D2;
              D1 = await UserProfileData.findOne({
                UserID: User1.id
              })
              D1.Credit = D1.Credit - parseInt(Balance)
              D1.save()
              D2 = await UserProfileData.findOneAndUpdate({
                UserID: User2.id
              },{
                $inc :{
                  Credit: parseInt(Balance) - tax
                }
              })
              if(!D2){
                D2 = await UserProfileData.create({
                  UserID: User2.id,
                  Credit: parseInt(Balance) - tax
                }).save()
              }
              collector.stop();
            });
        }
      }
    }
}