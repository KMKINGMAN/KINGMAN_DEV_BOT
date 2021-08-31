const translate = require("@iamtraction/google-translate");
module.exports = {
  name: 'tra',
  description: "To translate texts into Arabic",
  category: "info",
  usage:  [
    'world',
    'Text'
  ],
  aliases: ["tl"],
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
    const input = args.slice(0).join(" ");
    if (!input) {
      return KMSGC.USAGE(module.exports.name ,
        `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
    }
    translate(input, { to: "ar" }).then(async (res) => {
      await KMSGC.SEND(`translate from ${res.from.language.iso}`,res.text)
    .catch(async error => {
       await KMSGC.ERR("Sorry Faild")
    })
    })
 }
}