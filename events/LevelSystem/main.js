const KingMan = require('../../km-handler/kingman/Level'),
KINGMAN = new KingMan.KingmanLevel
module.exports = {
	name: 'message',
	async execute(kmsg, client) {
    if (kmsg.author.bot) return;
    if (!kmsg.guild) return;
    let xp = Math.floor(Math.random() * 10) + 1,
    NewLevel = await KINGMAN.AddXp(kmsg.author, kmsg.guild, xp),
    NewProfile = await KINGMAN.AddRank(kmsg.author, xp)
    if(NewLevel){
      let UserData = await KINGMAN.Search(kmsg.author, kmsg.guild)
      kmsg.channel.send(`**${kmsg.author} Your Level is ${UserData.Level} and Your Total is ${UserData.Xp}**`)
    }
  }
}