exports.run = function(client, message, args) {
  let DescribeI = [
    "slimy", "weird", "ugly", "fat", "dumb", "fucked up", "inverted", "messed up", "big", "bright ass", "trash dump"
  ];
  let NounI = [
    "troll", "idiot", "dummy", "poop", "toilet", "sumo wrestler", "fat so", "tendist", "crap turd", "minion", "shithead", "dumb kid"
  ];
  let HasI = [
    "that has ugly hair.", "that has ugly eyes.", "that has an ugly nose.", "that has ugly legs.", "that has ugly hands.", "that has ugly fingers.", "that has an ugly hat.", "that has ugly pants.", "that has ugly shorts.", "that has an ugly t-shirt.", "that has ugly earings.",
    "that has an ugly mouth.", "that has an ugly scar.", "that is super slow, slower than a slug."
  ];
  let Insult = message.mentions.users.first();
  if (!Insult) { return message.reply("You need to mention/ping someone to insult them.").catch(console.error); }
  if (Insult.id == client.user.id) { return message.reply(`I know what but I'm nothing but a ${DescribeI[Math.floor(Math.random() * DescribeI.length)]} looking ${NounI[Math.floor(Math.random() * NounI.length)]} ${HasI[Math.floor(Math.random() * HasI.length)]}`).catch(console.error); }
  if (message.author.client) { return; }
  message.channel.sendMessage(`${Insult}, you know what you're nothing but a ${DescribeI[Math.floor(Math.random() * DescribeI.length)]} looking ${NounI[Math.floor(Math.random() * NounI.length)]} ${HasI[Math.floor(Math.random() * HasI.length)]}`).catch(console.error); 
};
