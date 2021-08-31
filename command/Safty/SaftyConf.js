const GuildOps = require('../../Modals/safty/proticton-setup'),
ops = [
  'channelCreateLimit',
  'channelDeleteLimit',
  'roleCreateLimit',
  'roleDeleteLimit',
  'banLimit',
  'kickLimit',
  'logs',
  'punishment',
  'show'
]
module.exports = {
    name: "safeconfig",
    category: "safty",
    usage: ops,
    description : "security Config [AntiRaid Config]",
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      if (kmsg.guild.ownerID !== kmsg.author.id) {
        return await KMSGC.ERR('You Need TO BE \`GUILD_OWNER\`')
      }
      let Data;
      Data = await GuildOps.findOne({
        GuildID: kmsg.guild.id
      })
      if(!Data){
        Data = await GuildOps.create({
          GuildID: kmsg.guild.id
        })
        Data.save()
      }
      if(!args[0]){
        return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` `+module.exports.usage.join(`\n${prefix+module.exports.name} `))
      }
      function check(msg, arr) {
          return arr.some(op => op.toLowerCase() === msg.toLowerCase());
      }
      if (check(args[0],ops) === false || !args[0]) {
          return KMSGC.USAGE(module.exports.name ,
           `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
      }
      switch(args[0].toLowerCase()){
        case ops[0].toLowerCase():
        if(!args[1]){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (isNaN(args[1])){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (Number(args[1]) < 0){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        Data.channelcreate = Number(args[1])
        await Data.save()
        .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        break
        case ops[1].toLowerCase():
        if(!args[1]){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (isNaN(args[1])){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (Number(args[1]) < 0){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        Data.channeldelete = Number(args[1])
        await Data.save()
        .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        break
        case ops[2].toLowerCase():
        if(!args[1]){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (isNaN(args[1])){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (Number(args[1]) < 0){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        Data.rolecreate = Number(args[1])
        await Data.save()
        .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        break
        case ops[3].toLowerCase():
        if(!args[1]){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (isNaN(args[1])){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (Number(args[1]) < 0){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        Data.roledelete = Number(args[1])
        await Data.save()
        .then(m =>{
         kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        break
        case ops[4].toLowerCase():
        if(!args[1]){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (isNaN(args[1])){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (Number(args[1]) < 0){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        Data.banlimit = Number(args[1])
        await Data.save()
        .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        break
        case ops[5].toLowerCase():
        if(!args[1]){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (isNaN(args[1])){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        if (Number(args[1]) < 0){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `<Number>`)
        }
        Data.kicklimit = Number(args[1])
        await Data.save()
        .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        break
        case ops[6].toLowerCase():
        if(!args[1]){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `[Channel]`)
        }
        let Channel = await KMSGC.GetChannel(args[1])
        if(!Channel){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ `[Channel]`)
        }
        Data.logs = Channel.id
        await Data.save()
        .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        break
        case ops[7].toLowerCase():
        let TempD = [
          "ban",
          "kick",
          "demote"
        ]
        if(!args[1]){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ TempD.join(`\n ${prefix+module.exports.name+ ` ` + args[0]} `))
        }
        if (check(args[1], TempD) === false){
          return await KMSGC.USAGE(module.exports.name, prefix+module.exports.name+ ` ` + args[0] + ` `+ TempD.join(`\n ${prefix+module.exports.name+ ` ` + args[0]} `))
        }
        Data.punish = args[1].toLowerCase()
        await Data.save()
        .then(m =>{
          kmsg.react('✅')
        })
        .catch(()=>{
          kmsg.react('❌')
        })
        break
        case ops[8].toLowerCase():
        let ccl, cdl, rcl, rdl, bl, kl, push, log;
        ccl = Data.channelcreate
        cdl = Data.channeldelete
        rcl = Data.rolecreate
        rdl = Data.roledelete
        bl = Data.banlimit
        kl = Data.kicklimit
        push = Data.punish
        log = kmsg.guild.channels.cache.get(Data.logs)
        if(!log){
          log = "Disabled"
        }
        await KMSGC.SEND('Done', `
channelCreateLimit \`${ccl}\`
channelDeleteLimit \`${cdl}\`
roleCreateLimit \`${rcl}\`
roleDeleteLimit \`${rdl}\`
banLimit \`${bl}\`
KickLimit \`${kl}\`
punishment \`${push}\`
logs ${log}
`
        )
        break
      }
    }
}