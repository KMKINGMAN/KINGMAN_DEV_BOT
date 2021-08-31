const { MessageEmbed } = require('discord.js'),
axios = require('axios'),
conf = require('../../LOCALDB/kingmanconf.json')
module.exports = {
  name: 'weather',
  description: "To view weather status",
  category: "info",
  usage: ["[City]"],
  aliases: ["weather"],
    run: async(client, kmsg, args, prefix, KMSGC, KMODEC) => {
      let api ,city;
      api = conf.openweathermap;
      city =  args.slice(0).join(" ");
      if(!city){
        return KMSGC.USAGE(module.exports.name ,
        `${prefix}${module.exports.name} ${module.exports.usage.join(`\n${prefix}${module.exports.name} `)}\n\n\`${module.exports.description}\``)
      }
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`)
      .then(async (res) =>{
        let data ,currentTemp ,maxTemp ,minTemp ,humidity ,wind ,icon ,cityName ,country ,pressure ,cloudness;
        data = res
        currentTemp = Math.ceil(data.data.main.temp)
        maxTemp = data.data.main.temp_max;
        minTemp = data.data.main.temp_min;
        humidity = data.data.main.humidity;
        wind = data.data.wind.speed;
        icon = data.data.weather[0].icon;
        cityName = city;
        country = data.data.sys.country
        pressure = data.data.main.pressure;
        cloudness = data.data.weather[0].description;
        let info = new MessageEmbed()
        .setColor('GOLD')
        .setTitle(`
        There is \`${currentTemp} C\` in \`${cityName} - ${country}\`
        `)
        .addField(
          `Maximum Temperature:`, 
          `\`${maxTemp} C\``,
           true
        )
        .addField(
          `Minimum Temperature:`, 
          `\`${minTemp} C\``, 
          true
        )
        .addField(
          `Humidity:`, 
          `\`${humidity} %\``, 
          true
        )
        .addField(
          `Wind Speed:`, 
          `\`${wind}\` m/s`, 
          true
        )
        .addField(
          `Pressure:`, 
          `\`${pressure}\` hpa`, 
          true
        )
        .addField(
          `Cloudiness:`, 
          `\`${cloudness}\``, 
          true
        )
        .setThumbnail(`http://openweathermap.org/img/w/${icon}.png`)
        kmsg.channel.send(info)
      })
      .catch(async (err) => {
        await KMSGC.ERR(`I Can\`t find This City ${city}`)
      })
 }
}