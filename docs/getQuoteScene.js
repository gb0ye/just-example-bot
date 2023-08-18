const { Scenes } = require("telegraf");//imports from telegraf teh Scenes module


const quoteSceneID = "quoteScene"//this is kinda like an id that allows us to 1. create the scene and 2. enter the scene
//creates a scene
const quoteScene = new Scenes.BaseScene(quoteSceneID)//usually when creating a scene i don't store the ids in variables tho, i just put the string there

quoteScene.enter((ctx) => {//what happens when u enter a scene
    //id like you to add a btn
    ctx.reply("You have entered quote scene")
    const quoteUrl = "https://api.api-ninjas.com/v1/quotes?category=success";

    fetch(quoteUrl, {
        headers: {
            "X-Api-key": process.env.API_KEY
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
        const quoteMessage = `Quote: ${data[0].quote} - *${data[0].author}*`
        ctx.reply(quoteMessage, {
            parse_mode:"Markdown" //added this to show you how to bold words and shii
        })
    })
})

module.exports = {quoteScene, quoteSceneID}//exports