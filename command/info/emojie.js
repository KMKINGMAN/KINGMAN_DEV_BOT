module.exports = {
    name: "aemojie",
    category: "info",
    description : "To view all Guild emojies",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let i = 1
        const emojilis = kmsg.guild.emojis.cache
        .map(emoji => `**${i++}) ${emoji.toString()}**`)
        .join("\n");
        kmsg.channel.send(emojilis)
    }
}