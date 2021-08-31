const KINGMAN = require('./km-handler/index'),
kingman = require("./alive/keep_work.js"),
{
  Collection,
  Client
} = require("discord.js"),
client = new Client({
  partials: [
    'MESSAGE', 
    'CHANNEL', 
    'REACTION'
  ] 
});
client.commands = new Collection(),
client.eventss = new Collection(),
client.aliases = new Collection(),
client.invites = new Collection(),
fs = require('fs')
kingman();
const TOKEN_BOT = process.env['KM_TOKEN'],
config = require('./LOCALDB/kingmanconf.json'),
PREFIX = config.prefix,
GetStart = new KINGMAN.GiveAway(client, {
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
    embedColor: '#FF0000',
    embedColorEnd: '#000000',
    reaction: '🎉'
  }
})
client.giveawaysManager = GetStart
client.on("error", console.error);
["command", "events"].forEach(p => {
  require(`./km-handler/${p}`)(client);
});
client.on('message', kmsg => {
  const Msg = new KINGMAN.MSG(client, kmsg),
  Mode = new KINGMAN.MOD(client, kmsg),
  pmention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (kmsg.content.match(pmention)) {
    return kmsg.reply(`**MY PREFIX IS: ${PREFIX}**`)
  }
  if (kmsg.author.bot) return;
  if (!kmsg.guild) {
    return kmsg.reply("**ONLY WORK ON SERVERS NOT DM**")
  }
  if (!kmsg.content.startsWith(PREFIX)) return;
  const args = kmsg.content
  .slice(PREFIX.length)
  .trim() 
  .split(/ +/g), 
  kmcommand = args.shift().toLowerCase();
  if (kmcommand.length === 0) return;
  let kmcode = client.commands.get(kmcommand);
  if (!kmcode) kmcode = client.commands.get(client.aliases.get(kmcommand));
  if (kmcode) kmcode.run(client, kmsg, args, PREFIX, Msg, Mode);
});
client.login(TOKEN_BOT)