module.exports = {
    name: "clear",
    category: "moderation",
    usage:  [" <1 ~ 100>"],
    description : "delete messages",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
        let mp , bp;
        mp = await KMSGC.PremM("MANAGE_MESSAGES")
        if(!mp === true){
            return await KMSGC.ERR('You Need \`MANAGE_MESSAGES\` Permissions ')
        }
        bp = await KMSGC.PremMe("MANAGE_MESSAGES")
        if(!bp === true){
            return await KMSGC.ERR('I Need \`MANAGE_MESSAGES\` Permissions')
        }
        let MsgCount = parseInt(args[0]) || 99
        if(MsgCount > 100){
        kmsg.channel.send(`
        \`\`\`js
        i cant delete more than 100 messages 
        \`\`\`
        `)
        .then(m => m.delete({
          timeout : 5000
        }))
        }
        kmsg.channel.bulkDelete(MsgCount + 1, true)
        .then(async (msg) => {
          let h = await kmsg.channel.send(`
          \`\`\`javascript\n` +
          `${msg.size}` + 
          ` message(s) DELETED\`\`\`
          `)
          h.delete({
            timeout: 3000
         })
        })
        .catch(async (err) => {
          await KMSGC.ERR(`I Can\`t Delete Messages`)
      })
      
    }
}