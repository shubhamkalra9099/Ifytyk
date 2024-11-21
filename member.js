const { spawn } = require('child_process')
const axios = require('axios')
const http = require('http')
const { Telegraf, session, Extra, Markup, Scenes} = require('telegraf');
const  bot = new Telegraf('7762838015:AAH6eVpUZ9wcNksikwysK-hpUL-FSPSJeic')
const { BaseScene, Stage } = Scenes
const {enter, leave} = Stage
const stage = new Stage();
var bodyParser = require('body-parser');
const { link } = require('fs');
const Scene = BaseScene
bot.use(session())
bot.use(stage.middleware())

const view = new Scene('view')
stage.register(view)

const view1 = new Scene('view1')
stage.register(view1)

const key = 'd6eae563d8fa31bdc24c198b12e1b367'
admin='7368473793'
bot.command("start" , async ctx => {
   
    ctx.replyWithHTML("<b>WELCOME TO BOT!</b>",{reply_markup: { keyboard: [['ORDER']], resize_keyboard: true }}).catch((err) => sendError(err, ctx))
})


const userAnswers = {};


     
bot.hears("ORDER" , async ctx => {
      
    
        ctx.replyWithHTML("<b>Enter the group/channel link:-</b>").catch((err) => sendError(err, ctx))
       
        userAnswers[ctx.from.id] = { question1: null, question2: null };
    });
    
    // Listen for text messages
    bot.on('message', async ctx => {
        const chatId = ctx.from.id;
        const text = ctx.message.text;
    
        if (userAnswers[chatId]) {
            // If the user has not answered the first question, store the first answer
            if (!userAnswers[chatId].question1) {
                userAnswers[chatId].question1 = text;
                ctx.replyWithHTML('<b>Great, now enter the number of members (minimum amount is 10):- </b>').catch((err) => sendError(err, ctx))
            } 
            // If the user has answered the first question, store the second answer
            else if (!userAnswers[chatId].question2) {
                userAnswers[chatId].question2 = text;
                
      let  link=userAnswers[chatId].question1
       let qu=userAnswers[chatId].question2
    axios.post('https://prixsmm.com/api/v2', { key: key , action : 'add' , service : '161' , link : ''+link+'' , quantity : ''+qu+'' , }) .then(function (response) {
        console.log(response.data);
        
        ctx.replyWithHTML("<b>Order Added!\nOrder ID: "+response.data.order+"</b>").catch((err) => sendError(err, ctx))
        delete userAnswers[chatId];
    })}} 
})
 
        
    
     function sendError (err, ctx) {
        ctx.reply('ERROR!!')
       bot.telegram.sendMessage(admin, `Error From [${ctx.from.first_name}](tg://user?id=${ctx.from.id}) \n\nError: ${err}`, { parse_mode: 'markdown' })
      }
      bot.launch()
     console.log("STARTED")