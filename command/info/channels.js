module.exports = {
    name: "achnnels",
    category: "info",
    description : "To view all Guild channels",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let i = 1
        let ch = kmsg.guild.channels.cache
        .map(cs => `${i++}) ${cs.name}`)
        .join(`\n`)
        kmsg.channel.send(`\`\`\`js\n${kmsg.guild.name} Channels\n${ch} \`\`\``)
    }
}