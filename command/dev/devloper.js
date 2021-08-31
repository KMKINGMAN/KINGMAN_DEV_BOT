const { MessageEmbed } = require("discord.js");
 module.exports = {
   name: "devlopers",
   category: "dev",
   description: "This displays contact information with the developer",
   run: async (client, kmsg, args, prefix, KMSGC, KMODEC) => {
       let devloper = new MessageEmbed()
       .setTitle(`KINGMAN DEV`)
       .setDescription(`**Muhammad Kurkar**
       __**I am an undergraduate student from northeastern university**__
       `)
       .addFields(
        { name: '**\📱 PhoneNumber**', value: '+962792914245', inline: false },
        { name: '**\📶 GitHub**', value: '**[click here]( https://github.com/KMKINGMAN )**', inline: false },
        { name: '**\❤️ Discord Server**', value: '**[KINGMAN DEV]( https://discord.gg/kingmandev )**', inline: false },
       )
       .setImage('https://c.top4top.io/p_1904h4sui1.png')
       .setFooter('root.owner.name == kingman', 'https://c.top4top.io/p_1904h4sui1.png');
       kmsg.channel.send(devloper)

    }
 }
