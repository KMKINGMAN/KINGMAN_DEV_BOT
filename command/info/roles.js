module.exports = {
    name: "roles",
    category: "info",
    description : "To view all Guild roles",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let ro = kmsg.guild.roles.cache.filter(ros => ros.name !== "@everyone").map(r => r.name).join(`\n \* `)
    kmsg.channel.send(`**Guild Roles List **\n \* ${ro}`)
    }
}