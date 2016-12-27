const Eris = require("eris");
//if you had not already do, `npm install eris`
var bot = new Eris("YOUR BOT TOKEN");


bot.on("ready", () => { // When the bot is ready
    console.log("Online and ready to go!"); // Log "Ready!"
});

bot.on("messageCreate", (msg) => { // When a message is created and is what's going to be used a lot
    if(msg.content === "!ping") { // If the message the user send is "!ping"
        bot.createMessage(msg.channel.id, "Pong!");
        //Bot replies with "Pong!"
    } else if(msg.content === "!pong") { // Otherwise, if the message the user send is "!pong"
        bot.createMessage(msg.channel.id, "Ping!");
        // The bot will respond with "Ping!"
    }
});
