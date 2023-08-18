const { Telegraf, Markup, session, Scenes } = require("telegraf");
const dotenv = require("dotenv");//imports modules needed for using the .env file
dotenv.config();//this is for the env file, i forget what it actually does so gpt
const { getFacts } = require("./docs/getFacts")
const { quoteScene, quoteSceneID } = require("./docs/getQuoteScene")

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([quoteScene])//stages basically keep track of the scenes declared, all scenes declared through out the code would be here

bot.use(session());//initialized the use of sessions, we didn't actually use it in the code but its very useful, its just like a place holder for data, one that telegraf provides, kinda like declaring a variable, its used to carry data beween scenes
bot.use(stage.middleware())//same

bot.start((ctx) => {
   //defines keyboard buttons(inline keyboard. there are different types of keyboards)
   const keyboard = Markup.inlineKeyboard(
      [Markup.button.callback("Facts", "fact")] //first fact string is what shows up on btn, second one is what is sent back telegram
   );
   ctx.reply("W.O.R.K.I.N.G", keyboard);//reply's with keyboad
});

bot.action("fact", (ctx) => {
   //its the second fact string from bot.start button, when telegram sends it back it this is what tell out bot to look for it
   ctx.answerCbQuery();
   // console.log(ctx.chat) //you can uncomment the console.log to understand what ctx is actually all about
   getFacts(ctx); //imported function
});

bot.command("quotes", (ctx) => {//declared a command here
   ctx.scene.enter(quoteSceneID);//this is how u enter a scene and this is why the scene id is important
});

bot.launch();//ensures bot sends messages
