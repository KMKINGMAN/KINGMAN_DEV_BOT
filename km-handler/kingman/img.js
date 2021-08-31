const { registerFont } = require('canvas');
const { Canvas, resolveImage } = require('canvas-constructor');
registerFont('./Tajawal-Regular.ttf', { family: 'KINGMAN' });
const { MessageEmbed } = require("discord.js");
class IMG {
  constructor(client, message){
    this.client = client;
    this.message = message;
  }
  // Soon In V2 :)
  // async GameGen(Image, Qustion, Time){
  //   let image = await resolveImage(Image);
  //   let Game = new Canvas(854 , 480)
  //   .printImage(image, 0, 0, 854 , 480)
  //   .setColor('#FFFF')
  //   .setTextAlign('center')
  //   .setTextFont('64px Impact')
  //   .printText(Qustion, 428, 248)
  //   .setTextFont('70px Impact')
  //   .printText(`لديك ${String(Time)} ثانية للاجابة ` , 669 ,366)
  //   .toBuffer();
  //   return Game;
  // }


  /**
   * @description 
   * Function Used To Make Menber Profile Card
   * @param {String} Image Image Link
   * @param {String} Avatar User Avatar Link
   * @param {String} Name Member User name
   * @param {Number} Level Member Level
   * @param {Number} Credit Member Credits
   * @param {Number} Rank Member Ranl
   * @param {String} Title Member Title
   * @param {Number} RXp Member Require XP 
   * @returns Canva Image
   */
  async Profile(Image, Avatar, Name, Level, Credit, Rank, Title, RXp){
    let image = await resolveImage(Image),
    avatar = await resolveImage(Avatar),
   canva = new Canvas(1024,1024)
    .printImage(image,0,0,1024,1024)
    .setColor("black")
    .printCircle(870,70,30)
    .printCircularImage(avatar, 870,70,30)
    .setTextFont("50px usb")
    .printText(Name, 350,150)
    .printCircularImage(avatar, 200,150,100)
    .setColor("black")
    .printText(`LVL`, 120,350)
    .printText(Level, 120,400)
    .printText(`Rank`, 120,500)
    .printText(Rank, 120,550)
    .printText(`CREDITS`, 120,650)
    .printText(Credit, 120,700)
    .setColor('#D2CBF4')
    .printRoundedRectangle(113,856,800,60,60)
    .setColor('#37393D')
    .printRoundedRectangle(117,862,((Rank -1 ) /(RXp - 1)) * 797,50,100)
    .setColor("black")
    .printText(`${Rank} / ${RXp}`, 330,907)
    .setColor("black")
    .setTextFont("40px usb")
    .printText(Title ? Title : "", 330,450)
    .toBuffer()
  return canva;
  }
  /**
   * 
   * @param {String} name Member Username
   * @param {String} avatar Member Avatar Link
   * @returns Cava Image
   */
  async Welcome(name, avatar){
    let image = await resolveImage("https://media.discordapp.net/attachments/878307390326472754/881958019510968380/c2d66f330dc07fbf.png"),
    Avatar = await resolveImage(avatar),
    canva = new Canvas(3000,1370)
    .printImage(image,0,0,3000,1370)
    .setColor("black")
    .printCircularImage(Avatar,984,772,471)
    .setColor("white")
    .setTextFont("150px usb")
    .setTextAlign("center")
    .printText(name,2000, 1030)
    .toBuffer()
    return canva
  }
}
module.exports = {
	IMG
}