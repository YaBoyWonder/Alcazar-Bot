exports.run = function(client, message, args) {
  let numArray = args.map(n => parseFloat(n));
  if (numArray.length == 0) { return message.reply("You did not give any numbers.").catch(console.error); }
  let total = numArray.reduce((p, c) => p + c);
  if (isNaN(total)) { return message.reply("You used incorrect numbers.").catch(console.error); }
  message.reply(total).catch(console.error);
};
