const { Telegraf, Markup, session, Scenes } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();
const { getFacts } = require("./docs/getFacts")
const { quoteScene, quoteSceneID } = require("./docs/getQuoteScene")

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([quoteScene])

bot.use(session());
bot.use(stage.middleware())

bot.start((ctx) => {
   //defines keyboard buttons(inline keyboard. there are different types of keyboards)
   const keyboard = Markup.inlineKeyboard(
      [Markup.button.callback("Facts", "fact")] //first fact string is what shows up on btn, second one is what is sent back telegram
   );
   ctx.reply("W.O.R.K.I.N.G", keyboard);
});

bot.action("fact", (ctx) => {
   //its the second fact string from bot.start button, when telegram sends it back it this is what tell out bot to look for it
   ctx.answerCbQuery();
   // console.log(ctx.chat) //you can uncomment the console.log to understand what ctx is actually all about
   getFacts(ctx); //imported function
});

bot.command("quotes", (ctx) => {
   ctx.scene.enter(quoteSceneID);
});

bot.launch();
