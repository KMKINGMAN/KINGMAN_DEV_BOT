const colors = require("colors"),
{ Collection } = require('discord.js'),
figlet = require('figlet');
module.exports = {
	name: 'ready',
  async	execute(client){
    figlet('KINGMAN',(err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data.brightRed)
    });
    client.user.setPresence({
      status: 'online',
      activity:{
        name:'KINGMAN SYSTEM BOT',
        type:'STREAMING',
        url: 'https://www.twitch.tv/kingman4hack'
      }
    })
  

    for(const guild of client.guilds.cache.values()) {

      guild.fetchInvites()
      .then(invite => client.invites.set(guild.id, invite))
      .catch(error => console.log(error))
    };
  }
}