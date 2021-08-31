module.exports = {
    name: "ping",
    category: "info",
    description : "To view bot speed",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        kmsg.channel.send('**Ping**').then(m => {
            let ping = m.createdTimestamp - kmsg.createdTimestamp
            m.edit(`**Pong ${ping}**`)
        })
    }
}