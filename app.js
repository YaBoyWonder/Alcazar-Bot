"use strict";

const Discord = require('discord.js');
const settings = require('./settings.json');
const ddiff = require('return-deep-diff');
const client = new Discord.Client({fetchAllMembers: true})
const wonder = "138431969418543104";
const moment = require("moment");
require("moment-duration-format");
const fs = require("fs");
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));
const db = require("sqlite");
db.open("./selfbot.sqlite");
client.settings = settings;
client.db = db;
const schedule = require('node-schedule');
const date = require('date.js');
const request = require('request');
const rp = require('request-promise-native');
const numeral = require('numeral');
/**let fs = require('fs');
var readFile = JSON.parse(fs.readFileSync('../data.json', 'utf8'));*/
/**********************************************************************/
var Cleverbot = require("cleverbot-node");
var cleverbot = new Cleverbot;
var things = ["Yes", "No", "In the near future", "Possibly"];

/**********************************************************************/
//client.on('',''{});
client.on('ready',() => {
	console.log('I\'m Online\nI\'m Online');
});

client.on('guildCreate', guild => {
	guild.defaultChannel.sendMessage("", {embed: {
		color: 0x00FF00,
		title: `I have joined ${guild.name} and my name is BB-8. To see my power, please run the command bbhelp. Keep in mind I am in beta still so much more will be added shortly!`,
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
	}});
});


client.on("guildCreate", guild => {
		client.channels.get('256929247325716482').sendMessage("", {embed: {
			color: 0x90BDF4,
			title: "I've been invited to server **" + guild.name + "**\nServer ID: **" + guild.id + "**\nRegion: **" + guild.region + "**",
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: '©BB-8'
			}
		}});
});

client.on("guildDelete", guild => {
		client.channels.get('256929247325716482').sendMessage("", {embed: {
			color: 0xFF0101,
			title: "I've been removed from server **" + guild.name + "**",
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: '©BB-8'
			}
		}});
});

/**client.on('guildMemberAdd', member => {
client.channels.get('264519228613328912').sendMessage('Welcome ' + member.user.username + '.');
})*/

client.on("guildMemberAdd", member => {
	if (member.guild.id !== '174991160274583552') return;
		client.channels.get('264519228613328912').sendMessage("", {embed: {
			color: 0x303BEC,
			title: 'Welcome to our guild' + " " + member.user.username + '!',
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: '©BB-8'
			}
		}});
});


//npm install -save return-deep-diff
client.on('guildBanAdd', (guild, user) => {
	guild.defaultChannel.sendMessage("", {embed: {
		color: 0xF25656,
		title: `${user.username} was just banned!`,
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
	}});
});

client.on('guildBanRemove', (guild, user) => {
	guild.defaultChannel.sendMessage("", {embed: {
		color: 0x56BEF2,
		title: `${user.username} was just unbanned!`,
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
	}});
});

/**********************************************************************/
var prefix = "bb"
client.on('message', message => {
	var guild = message.guild;
	if (!message.content.startsWith(prefix)) return;
	let args = message.content.split(' ').slice(1);
	var argresult = args.join(' ');
	if (message.author.bot) return;

	let userData = points[message.author.id];
   if(!userData) userData = {points: 0, level: 0};
   userData.points++;

   let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
   if(curLevel > userData.level) {
     // Level up!
     userData.level = curLevel;
     message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
   }

   if(message.content.startsWith(prefix + "level")) {
     message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
   }
	fs.writeFile('message, txt', 'Hello Node.js', (err) => {
		if(err) throw err;
		console.log('It\'s saved!');
	})

if (message.content.startsWith(prefix + "say")) {
					message.channel.sendMessage("", {embed: {
						color: 0x00FF00,
						title: message.content.substring(5),
						timestamp: new Date(),
						footer: {
							icon_url: client.user.avatarURL,
							text: '©BB-8'
						}
					}});
	    }

			if(message.content.startsWith(prefix + 'wisay')) {
				message.channel.sendMessage("", {embed: {
					color: 0x59AB53,
					author: {
				    name: client.user.username,
				    icon_url: client.user.avatarURL
				  },
				fields: [
					{
						name: 'What is the say command?',
						value: `This is when the bot will repeat anything said issued with this cmd`
					}
				],
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: '©BB-8'
				}
				}});
				};


const weatherIconMap = {
				    'clear-day': '☀',
				    'clear-night': '🌜',
				    rain: '🌧',
				    snow: '🌨',
				    sleet: '☔',
				    wind: '💨',
				    fog: '🌫',
				    cloudy: '☁',
				    'partly-cloudy-day': '⛅',
				    'partly-cloudy-night': '☁'
				};
const precipDescMap = {
			    rain: '🌧 Rain',
				    snow: '🌨 Snow',
				    sleet: '☔ Sleet'
				};

if(message.content.startsWith(prefix + 'weather')) {
	if(args.length === 0) return 'no location specified';
	 const poss = [
			 'currently',
			 'minutely',
			 'hourly',
			 'daily'
	 ];

	 let index = poss.indexOf(args[0]);
	 if(index == -1) {
			 args.unshift('currently');
			 index = 0;
	 }

	 const type = poss.splice(index, 1).join('');

	 const rpDarksky = rp.defaults({
			 baseUrl: 'https://api.darksky.net/forecast/' + process.env.darksky,
			 qs: {
					 exclude: poss.join(',')
			 },
			 json: true,
			 method: 'get'
	 });

	 const rpGoogle = rp.defaults({
			 baseUrl: 'https://maps.googleapis.com/maps/api',
			 qs: {
					 key: process.env.youtube
			 },
			 method: 'get',
			 json: true
	 });

	 return rpGoogle({
			 uri: 'geocode/json',
			 qs: {
					 address: args.slice(1).join(' ')
			 }
	 }).then(loc => {
			 if(loc.status == 'ZERO_RESULTS') return;

			 const coords = loc.results[0].geometry.location;
			 return Promise.all([
					 rpDarksky({
							 uri: coords.lat + ',' + coords.lng
					 }),
					 loc.results[0]
			 ]);
	 }).then(res => {

			 if(!res) return 'no location found';

			 const weather = res[0];
			 const loc = res[1];

			 const cur = weather[type];
			 let out = '';

			 out += `\`${loc.formatted_address}\`\n\n${weatherIconMap[cur.icon]}`;

			 out += ' **' +cur.summary + '**\n\n';

			 let data;
			 if(Array.isArray(cur.data)) {
					 data = cur.data;
			 }   else    {
					 data = [cur];
			 }

			 if(type == 'hourly') data.splice(0, 24);

			 for(let i = 0; i < data.length;)    {
					 const point = data[i];

					 out += '`' + moment.unix(point.time).format('MM-DD-YYYY HH:mm:ss a') + '`\n';

					 if(point.temperature)   {
							 out += `🌡 \`${point.temperature}F\` (feels like \`${point.apparentTemperature}\`)\n`;
					 }

					 if(point.windSpeed) {
							 out += `🌬 \`${point.windSpeed}MPH\` at \`${point.windBearing}°\`\n`;
					 }

					 if(point.pressure)  {
							 out += `🗜 \`${point.pressure}mb\`\n`;
					 }

					 if(point.humidity)  {
							 out += `💦 \`${Math.round(point.humidity * 100)}%\` humidity\n`;
					 }

					 out += precipDescMap[point.precipType] || '☂ Precipitation';

					 out += ` - \`${numeral(point.precipProbability * 100).format('0.00')}%\` at \`${numeral(point.precipIntensity).format('0.00')}in/hr\``;
					 out += '\n\n';

					 if(type == 'minutely')    {
							 i += 10;
					 }   else if(type == 'hourly')   {
							 i += 4;
					 }   else {
							 i++;
					 }
			 }

			 out += '*Powered by Dark Sky (<https://darksky.net/poweredby/>)*';

			 return out;
	 });
}

if(message.content.startsWith(prefix + 'emote')) {
	const emoji = guild.emojis.first()
	message.channel.sendMessage(`${emoji}`);
}

if(message.content.startsWith(prefix + 'remindme')) {
	let remIndex = args.indexOf('to');
	remIndex = remIndex === -1 ? 0 : remIndex;

	const atIndex = args.lastIndexOf('at');
	const inIndex = args.lastIndexOf('in');

	const timeIndex = atIndex > inIndex ? args.lastIndexOf('at') : args.lastIndexOf('in');

	if(timeIndex < remIndex)    {
			return 'can\'t parse that :cry:';
	}

	const newDate = date(args.slice(timeIndex + 1).join(' '));
	if(newDate <= new Date()) {
			return 'that date doesn\'t seem to be valid.';
	}

	schedule.scheduleJob(newDate, () => {
			if (args[0] == 'me')
			{
					message.reply(args.slice(remIndex + 1, timeIndex).join(' '));
			}
			else
			{
					message.channel.sendMessage(args[0] + ', ' + args.slice(remIndex + 1, timeIndex).join(' '));
			}
	});

	return 'reminder set for ' + moment(newDate).format('dddd, MMMM Do YYYY, h:mm:ss a ZZ');
}

if(message.content.startsWith(prefix + `<@251715073553203200>help`)) {
	message.channel.sendMessage('Run the cmd `bbhelp` to see the cmds');
}

if(message.content.startsWith(prefix + 'id')) {
	const mentions = message.mentions;
	 let out = [];

	 for(const [, user] of mentions.users)   {
			 if(user.equals(message.client.user)) continue;
			 out.push(user + ': `' + user.id + '`');
	 }

	 for(const [, channel] of mentions.channels) {
			 out.push(channel + ': `' + channel.id +'`');
	 }

	 for(const [, role] of mentions.roles)   {
			 out.push(role + ': `' + role.id + '`');
	 }

	 if(out.length === 0) out.push(message.author.id);
	 return out.join('\n');
}

if(message.content.startsWith(prefix + 'slot')) {
	const cash = args.join(" ");
const symbols = ['🍒', '💰', '⭐', '🎲', '💎', '❤', '⚜', '🔅', '🎉'];
const result = symbols[Math.floor(Math.random() * symbols.length)];
const result2 = symbols[Math.floor(Math.random() * symbols.length)];
const result3 = symbols[Math.floor(Math.random() * symbols.length)];
if (!cash) { return message.reply("You did not give any ammount of cash to pay.").catch(console.error); }
if (isNaN(cash)) { return message.reply("Trying to use letters is it...").catch(console.error); }
message.channel.sendMessage("💎💎💎: $900\n💰💰💰: $800\n❤❤❤: $700\n🎉🎉🎉: $600\n🍒: $500\n⭐⭐⭐: $400\n⚜⚜⚜: $300\n🔅🔅🔅: $200\n🎲🎲🎲: $100").catch(console.error).then(() => {
	message.reply(`Let's see what you got for paying ${cash}: ${result}|${result2}|${result3}`).catch(console.error);
});
}


if(message.content.startsWith(prefix + 'help')) {
	message.react('🎉')
};

if(message.content.startsWith(prefix + 'sss')){
client.channels.get('174991160274583552').sendMessage('Ayy yo fellahs This is a test, dw');
}


			if(message.content.startsWith(prefix + 'java')){
		//message.editCode("js", "content`").catch(error => console.log(error));
		message.channel.sendMessage("Blah").then(m => m.editCode("js", "if(message.content.startsWith(prefix + 'amazing')) {"));
			};



/**if(message.content.startsWith(prefix + 'jj')){
	message.channel.sendMessage("Ping").then(m => m.editcode("js", "if(msg.content.startsWith(prefx + 'ping'))"));
};*/

if (message.content.startsWith(prefix + "8ball")) {
					 message.channel.sendMessage("", {embed: {
						 color: 0x040404,
						 title: "I have choosen: " + things[Math.floor(Math.random() * things.length)],
						 timestamp: new Date(),
						 footer: {
							 icon_url: client.user.avatarURL,
							 text: '©BB-8'
						 }
					 }});
		 	 };

			 if(message.content.startsWith(prefix + 'wi8ball')) {
				 message.channel.sendMessage("", {embed: {
					 color: 0x040404,
					 author: {
						 name: client.user.username,
						 icon_url: client.user.avatarURL
					 },
				 fields: [
					 {
						 name: 'What is the 8ball command?',
						 value: `Its an 8ball cmd, simple`
					 }
				 ],
				 timestamp: new Date(),
				 footer: {
					 icon_url: client.user.avatarURL,
					 text: '©BB-8'
				 }
				 }});
				 };

if(message.content.startsWith(prefix + 'mom')) {
	message.channel.sendMessage(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`);
}

if(message.content.startsWith(prefix + "ppp")){
        if(message.author.id !== "138431969418543104") return;
        message.delete();
          message.channel.sendMessage("", {embed: {
  color: 3447003,
  author: {
    name: "Wonder",
    icon_url: client.user.avatarURL
  },
  title: 'Selfbot Statistics',
  icon_url: client.user.avatarURL,
  fields: [
    {
      name: 'Mem Usage',
      value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
      inline: true
    },
    {
      name: 'Discord.js Version',
      value: Discord.version,
      inline: true
    },
    {
      name: 'Node Version:',
      value: '7.3.0',
      inline: true
    },
    {
      name: 'Servers:',
      value: `${client.guilds.size.toLocaleString()}`,
      inline: true,
    },
    {
      name: 'Channels:',
      value: `${client.channels.size.toLocaleString()}`,
      inline: true,
    },
    {
      name: 'Users:',
      value: `${client.users.size.toLocaleString()}`,
      inline: true,
    },
    {
      name: 'Descriminator',
      value: `${client.user.discriminator}`,
      inline: true
    }
  ],
}});
    }


if(message.content === prefix + "servers") {
	message.channel.sendMessage("I'm on **" + client.guilds.size + "** servers.");
			 }

if(message.content.startsWith(prefix + 'kick')) {
	let userToKick = message.mentions.users.first();
 let ModLog = client.channels.get('265283077096341510');
 if (!message.member.hasPermission("KICK_MEMBERS")) { return message.reply("You do not have permissions to do that."); }
 if (!message.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS")) { return message.reply("I do not have permission to do that."); }
 if (!userToKick) { return message.reply("You need to mention a user to kick."); }
 message.guild.member(userToKick).kick()
 message.reply(`${userToKick} has been kicked from the server...`);
 let ModLogMessage = {
	 color: 3447003,
	 author: {
		 name: `${userToKick.username} #${userToKick.discriminator} (${userToKick.id})`,
		 icon_url: message.author.avatarURL
	 },
	 fields: [
		 {name: "Case: Warn", value: `User: ${userToKick.username} #${userToKick.discriminator} (${userToKick.id})\nReason: ${message.content.split(" ").slice(2).join(" ")}\nModerator: ${message.author.username} Time: ${new Date()}`}
	 ]
 };
 ModLog.sendMessage("", {embed: ModLogMessage}).catch(console.error);
}

if(message.content.startsWith(prefix + 'wikick')) {
	message.channel.sendMessage("", {embed: {
		color: 0xEC837B,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL,
		},
	fields: [
		{
			name: 'What is the kick command?',
			value: `This is when the user meantioned is kicked from the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};


if(message.content.startsWith(prefix + 'ban')) {
	let person = message.guild.member(message.mentions.users.first());
let ModLog = client.channels.get('265283077096341510');
if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You do not have permissions to do that.");
if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.reply("I do not have permission to do that.");
if (!person) return message.reply("You need to mention a user to ban.");
if (!person.bannable) return message.reply("User cannot be banned.");
message.reply(`Successfully banned ${person} from the server...`);
let ModLogMessage = {
	color: 3447003,
	author: {
		name: `${person.user.username} #${person.user.discriminator} (${person.user.id})`,
		icon_url: message.author.avatarURL
	},
	fields: [
		{name: "Case: Ban", value: `User: ${person.user.username} #${person.user.discriminator} (${person.user.id})\nReason: ${message.content.split(" ").slice(2).join(" ")}\nModerator: ${message.author.username} Time: ${new Date()}`}
	]
};
ModLog.sendMessage("", {embed: ModLogMessage}).catch(console.error);
person.ban(7);
}

if(message.content.startsWith(prefix + 'wiban')) {
	message.channel.sendMessage("", {embed: {
		color: 0xDAE25E,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the ban command?',
			value: `This is when the user meantioned is banned from the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'edit')) {
message.channel.sendMessage("Blah").then(m => m.edit("meh").then(m => m.edit(":sweat_drops:").then(m => m.edit(":eggplant:").then(m => m.edit(":thinking:").then(m => m.edit(":christmas_tree: :santa: :christmas_tree: :santa: :christmas_tree:"))))));
};

if(message.content.startsWith(prefix + 'lily')) {
	message.channel.sendMessage("", {embed: {
		color: 0xDAE25E,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the ban command?',
			value: `This is when the user meantioned is banned from the guild`,
			inline: true
		},
		{
	 name: 'Fields',
	 value: 'They can have different fields with small headlines.',
	 	inline: true
	},
	{
 name: 'Fields',
 value: 'They can have different fields with small headlines.',
	inline: true
},
{
name: 'Fields',
value: 'They can have different fields with small headlines.',
inline: true
}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};


if(message.content.startsWith(prefix + 'uptime')) {

 var milliseconds = parseInt((client.uptime%1000)/100)
 , seconds = parseInt((client.uptime/1000)%60)
 , minutes = parseInt((client.uptime/(1000*60))%60)
 , hours = parseInt((client.uptime/(1000*60*60))%24)
 , days = parseInt((client.uptime/(1000*60*60*24)) % 7);
days = (days < 10) ? "0" + days : days;
hours = (hours < 10) ? "0" + hours : hours;
minutes = (minutes < 10) ? "0" + minutes : minutes;
seconds = (seconds < 10) ? "0" + seconds : seconds;
 var uptime = `**${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds, and **${milliseconds}** milliseconds`;
message.channel.sendMessage(uptime);
}


var cleverMessage = " "
if(message.content.startsWith(prefix + 'clever')) {
	Cleverbot.prepare(function() {
	cleverbot.write(message.content.substring(6), function (response) {
	message.channel.sendMessage(response.message);
	});
	});
	}

	if(message.content.startsWith(prefix + 'wiclever')) {
		message.channel.sendMessage("", {embed: {
			color: 0x84E375,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL
			},
		fields: [
			{
				name: 'What is the clever command?',
				value: `This is when the bot will respond and you can have a nice conversation with it!`
			}
		],
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
		}});
	};


if(message.content.startsWith(prefix + "rolecreate")) {
	guild.createRole({name: 'Wonder', color: '#EC4084', mentionable:true}).catch(error => console.log(error));
};

//edit this to work for when a user does the rolecreate cmd for users and etc for everyone athqru tarht ahru
  if (message.content.startsWith(prefix + 'cmdrole')) {
    let modRole = message.guild.roles.find("name", "BB-8 Commander");
    if(message.member.roles.has(modRole.id)) {
      message.channel.sendMessage("bar!").catch(console.error);
    } else {
      message.reply("You dont have `BB-8 Commander` role!").catch(console.error);
    }
  };

if(message.content.startsWith(prefix + "createdd")) {
if (message.author.id === wonder) {
	guild.createRole({name: 'Testing', color: '#EC4084', mentionable:true}).catch(error => console.log(error));
	}
};

if(message.content.startsWith(prefix + "embedrole")) {
	let modRole = message.guild.roles.find("name", "Bot Commander");
	if(message.member.roles.has(modRole.id)) {
	guild.createRole({name: 'Embed', color: '#FFC36F', permissions:["EMBED_LINKS"]}).catch(error => console.log(error));
} else {
	message.reply("You dont have the `Bot Commander` Role or BB-8 Does not have manage roles!").catch(error => console.log(error));
	}
};

if(message.content.startsWith(prefix + 'roleg')) {
	guild.member(message.mentions.users.first()).addRole('257831241124937728').catch(error => console.log(error));
};

if(message.content.startsWith(prefix + 'taken')) {
 	guild.member(message.mentions.users.first()).removeRole('257831241124937728').catch(error => console.log(error));
};
//Wonder role
if(message.content.startsWith(prefix + 'giverole')) {
	guild.member(message.mentions.users.first()).addRole('257819533350273026').catch(error => console.log(error));
};

if(message.content.startsWith(prefix + 'takerole')) {
 	guild.member(message.mentions.users.first()).removeRole('257819533350273026').catch(error => console.log(error));
};

	if (message.content.startsWith(prefix + 'ping')) {
		message.channel.sendMessage("", {embed: {
			color: 800080,
			title: `Pong! \`${Date.now() - message.createdTimestamp} ms\``,
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: '©BB-8'
			}
		}});
	}

	if(message.content.startsWith(prefix + 'wiping')) {
		message.channel.sendMessage("", {embed: {
			color: 800080,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL
			},
		fields: [
			{
				name: 'What is the ping command?',
				value: `This is when the bot will respond with pong and show the ms it took to respond`
			}
		],
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
		}});
	};

	if(message.content.startsWith(prefix + `send`)) {
		client.channels.get(`255968735930613761`).sendMessage(`Hello`);
	}else


if(message.content.startsWith(prefix + 'setstatus')) {
  if(!argresult) argresult = 'online';
	client.user.setStatus(argresult);
}else

	if(message.content.startsWith(prefix + `ayy`)) {
		message.channel.sendMessage("", {embed: {
			color: 3447003,
			title: `lmao \`${Date.now() - message.createdTimestamp} ms\``,
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: '©BB-8'
			}
		}});
	}

	if(message.content.startsWith(prefix + 'memem')){
		message.channel.sendMessage("```js\n  if(msg.content.startsWith(prefix + 'ayy'))```");
	};

if(message.mentions.users.size !== 0) {
	if(message.content.startsWith(prefix + 'info')) {
		message.channel.sendMessage("", {embed: {
			color: 0xDAE25E,
			author: {
				name: `${message.mentions.users.first().username}`,
				icon_url: `${message.mentions.users.first().avatarURL}`,
		},
			thumbnail: { url: message.mentions.users.first().avatarURL },
		fields: [
			{
				name: 'Username',
				value: `${message.mentions.users.first().username}`,
				inline: true
			},
			{
		 name: 'Discriminator',
		 value: `${message.mentions.users.first().discriminator}`,
			inline: true
		},
		{
	 name: 'ID',
	 value: `${message.mentions.users.first().id}`,
		inline: true
	},
	{
	name: 'Status',
	value: `${client.user.presence.status}`,
	inline: true
},
		],
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}

		}});
	};
}

if(message.content.startsWith(prefix + 'serverinfo')) {
	message.channel.sendMessage("", {embed: {
		color: 0xDAE25E,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	thumbnail: { url: message.channel.avatarURL },
	fields: [
		{
			name: "Name",
			value: `${message.guild.name}`,
			inline: true
		},
		{
	 name: "Creation Date",
	 value: `${message.guild.createdAt}`,
	 	inline: true
	},
	{
 name: "Default channel",
 value: `${message.guild.defaultChannel}`,
	inline: true
},
{
	 name: "Guild ID",
	 value: `${message.guild.id}`,
	 inline: true
},
{
	 name: "Members",
	 value: `${message.guild.memberCount}`,
	 inline: true
},
{
	name: "Owner",
	value: `${message.guild.owner.user}`,
	inline: true
}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.mentions.users.size !== 0) {
    if(message.content.startsWith(prefix + 'info')) {
        const statusMap = {
  online: `<:vpOnline:212789758110334977>`,
  idle: `<:vpAway:212789859071426561>`,
  dnd: `<:vpDnD:230093576355184640>`,
	offline: `<:vpOffline:212790005943369728>`,
	streaming: `<:vpStreaming:212789640799846400>`
};
let emoji = statusMap[message.mentions.users.first().presence.status]
        message.channel.sendMessage("", {embed: {
            color: 0xDAE25E,
            author: {
                name: `${message.mentions.users.first().username}`,
                icon_url: `${message.mentions.users.first().avatarURL}`,
        },
            thumbnail: { url: message.mentions.users.first().avatarURL },
        fields: [
            {
                name: 'Username',
                value: `${message.mentions.users.first().username}`,
                inline: true
            },
            {
         name: 'Discriminator',
         value: `${message.mentions.users.first().discriminator}`,
            inline: true
        },
        {
     name: 'ID',
     value: `${message.mentions.users.first().id}`,
        inline: true
    },
    {
    name: 'Status',
    value: `${emoji}`,
    inline: true
    }
        ],
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: '@BB-8'
        }

        }});
    };
}

//*********************************************************************************INSULT CMD ADD TO HELP*************************************/
if(message.content.startsWith(prefix + 'insult')){
	let DescribeI = [
	"slimy", "weird", "ugly", "fat", "dumb"
];
let NounI = [
	"troll", "idiot", "dummy", "poop", "toilet", "sumo wrestler", "fat so", "tendist"
];
let HasI = [
	"that has ugly hair.", "that has ugly eyes.", "that has an ugly nose.", "that has ugly legs.", "that has ugly hands.", "that has ugly fingers.", "that has an ugly hat.", "that has ugly pants.", "that has ugly shorts.", "that has an ugly t-shirt.", "that has ugly earings.",
	"that has an ugly mouth.", "that has an ugly scar.", "that is super slow, slower than a slug."
];
let Insult = message.mentions.users.first();
if (!Insult) { return message.reply("You need to mention/ping someone to insult them.").catch(console.error); }
if (Insult.id == client.user.id) { return message.reply(`I know what but I'm nothing but a ${DescribeI[Math.floor(Math.random() * DescribeI.length)]} looking ${NounI[Math.floor(Math.random() * NounI.length)]} ${HasI[Math.floor(Math.random() * HasI.length)]}`).catch(console.error); }
if (message.author.bot) { return; }
message.channel.sendMessage(`${Insult}, you know what you're nothing but a ${DescribeI[Math.floor(Math.random() * DescribeI.length)]} looking ${NounI[Math.floor(Math.random() * NounI.length)]} ${HasI[Math.floor(Math.random() * HasI.length)]}`).catch(console.error);
};

if(message.content.startsWith(prefix + 'speak')){
	if (!args.length) { return message.reply("You did not give any text for me to say.").catch(console.error); }
  let Say = {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    fields: [
      {
        name: "Spoken",
        value: `${args.join(" ")}`
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "CBP"
    }
  };
  message.channel.sendMessage("", { embed : Say }).catch(console.error);
};

if(message.content.startsWith(prefix + 'mute')) {
let Muted = message.mentions.users.first();
let muteRole = message.guild.roles.find("name", "Muted");
let StaffRole = message.guild.roles.find("name", "Bot Commander");
let ModLog = client.channels.get("265283077096341510");
const UserToMute = message.guild.member(Muted);
if (!Muted) { return message.reply("You did not ping/mention someone to mute.").catch(console.error); }
if (!message.member.roles.has(StaffRole.id)) { return message.reply("You do not have Bot Commander to mute someone.").catch(console.error); }
if (UserToMute.roles.has(StaffRole.id)) { return message.reply("This is a staff member.").catch(console.error); }
if (UserToMute.roles.has(muteRole.id)) { return message.reply("That person already has a mute role.").catch(console.error); }
message.channel.sendMessage(`${Muted} has been mute.`);
let ModLogMessage = {
	color: 3447003,
	author: {
		name: `${Muted.username} #${Muted.discriminator} (${Muted.id})`,
		icon_url: message.author.avatarURL
	},
	fields: [
		{name: "Case: Mute", value: `User: ${Muted.username} #${Muted.discriminator} (${Muted.id})\nReason: ${message.content.split(" ").slice(2).join(" ")}\nModerator: ${message.author.username}`}
	]
};
ModLog.sendMessage("", {embed: ModLogMessage}).catch(console.error).catch(console.error);
UserToMute.addRole(muteRole).catch(console.error);
};

if(message.content.startsWith(prefix + 'announce')) {
	if (message.content.includes(client.user.id)) { return message.reply("You cannot use me in an announcement.").catch(console.error); }
if (!args.length) { return message.reply("You did not support a message to announce!").catch(console.error); }
let StaffRole = message.guild.roles.find("name", "Bot Commander");
if (!message.member.roles.has(StaffRole.id)) { return message.reply("You do not have the Bot Commander role!").catch(console.error); }
message.reply("Succesful.").catch(console.error);
client.channels.get("175047946453254144").sendMessage(`Announcement : ${args.join(" ")}. User : ${message.author.username}`).catch(console.error);
}

if(message.content.startsWith(prefix + 'pay')) {
	let PayTo = message.mentions.users.first();
 if (!args.length) { return message.reply("You did not give a number of cash or a thing to give.").catch(console.error); }
 if (!PayTo) { return message.reply("You did not ping/mention someone to give money to.").catch(console.error); }
 if (PayTo.id == client.user.id) { return message.reply("You cannot give me money.").catch(console.error); }
 message.reply(`You payed, ${args.join(" ")}. Keep this note.`).catch(console.error);
}

if(message.content.startsWith(prefix + 'gameset')) {
  if(message.author.id !== "138431969418543104") return;
let Game = args.join(" ");
client.user.setGame(`${Game}`);
}

if(message.content.startsWith(prefix + 'rename')) {
	var username = args.join("_");
client.user.setUsername(username);
message.channel.sendMessage(`Renamed myself to **${username}** because I can.`).catch(console.error);
message.delete().catch(console.error);
}


if(message.content.startsWith(prefix + 'unmute')) {
	let muteRole = message.guild.roles.find("name", "Muted");
let ModLog = client.channels.get("265283077096341510");
let unMuted = message.mentions.users.first();
let StaffRole = message.guild.roles.find("name", "Bot Commander");
const UserToUnmute = message.guild.member(unMuted);
if (!unMuted) { return message.reply("You did not ping/mention someone to unmute.").catch(console.error); }
if (!message.member.roles.has(StaffRole.id)) { return message.reply("You do not have Bot Commander!").catch(console.error); }
if (!UserToUnmute.roles.has(muteRole.id)) { return message.reply("The person you just mention does not have a Muted role.").catch(console.error); }
message.channel.sendMessage(`${unMuted} has been unmute.`).catch(console.error);
let ModLogMessage = {
	color: 3447003,
	author: {
		name: `${unMuted.username} #${unMuted.discriminator} (${unMuted.id})`,
		icon_url: message.author.avatarURL
	},
	fields: [
		{name: "Case: Unmute", value: `User: ${unMuted.username} #${unMuted.discriminator} (${unMuted.id})\nReason: ${message.content.split(" ").slice(2).join(" ")}\nModerator: ${message.author.username}`}
	]
};
ModLog.sendMessage("", {embed: ModLogMessage}).catch(console.error);
UserToUnmute.removeRole(muteRole).catch(console.error);
}

if(message.content.startsWith(prefix + 'createrole')) {
	let StaffRole = message.guild.roles.find("name", "Bot Commander");
if (!message.member.roles.has(StaffRole.id)) { return message.reply("User does not have Bot Commander role").catch(console.error); }
if (!args.join(" ")) { return message.reply("You did not support any name for the role!").catch(console.error); }
message.guild.createRole({ name: `${args.join(" ")}` }).then(role => console.log(`Created role ${role}`)).catch(console.error);
};



if(message.content.startsWith(prefix + 'prune'))	{
	if(args.length > 1 && message.guild.member(message.author.id).hasPermission('MANAGE_MESSAGES')){
	      message.channel.bulkDelete(args[1]);
	      message.channel.sendMessage("Deleted " + args[1] + ' messages in ' + '<#' + message.channel.id + '>');
	    }
	    else {
	      message.channel.sendMessage('Sorry you lack perms to delete messages!')
	    }
		}

if(message.content.startsWith(prefix + 'coin')) {
	let coin = ["Heads!", "Tails!"];
  message.reply(coin[Math.floor(Math.random() * coin.length)]).catch(console.error);
};

if(message.content.startsWith(prefix + 'cookie')) {
	let EatCookieResults = [
	"You have ate the cookie.", "You don't have a cookie.", "You have a cookie but you saved it for later."
];
message.reply("🍪" + EatCookieResults[Math.floor(Math.random() * EatCookieResults.length)]).catch(console.error);
}

if(message.content.startsWith(prefix + 'google')) {
	if (!args.length) { message.edit("No entries found."); }
message.delete().catch(console.error).then(() => {
	message.channel.sendMessage("*Searching...*").catch(console.error).then(() => {
		message.channel.sendMessage("https://www.google.com/?gws_rd=ssl#q=" + args.join('+')).catch(console.error);
	});
});
}

if(message.content.startsWith(prefix + 'comic')) {
	const max = 4462;
  message.reply('http://explosm.net/comics/' + (Math.floor(Math.random()* max) + 1)).catch(console.error);
}
		if(message.content.startsWith(prefix + 'wiinfo')) {
			message.channel.sendMessage("", {embed: {
				color: 0x84E375,
				author: {
					name: client.user.username,
					icon_url: client.user.avatarURL
				},
			fields: [
				{
					name: 'What is the info command?',
					value: `This is when the bot will respond showing the user's username, id, and avatar url`
				}
			],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: '©BB-8'
			}
			}});
		};

if(message.content.startsWith(prefix + 'lockdown')) {
	let result = args.join(" ");
const ms = require("ms");
if (!result) { return message.reply("Please support a number. The number will be used as MS.").catch(console.error); }
if (message.author.id !== message.guild.owner.id) return;
message.channel.overwritePermissions(message.guild.id, {
	SEND_MESSAGES: false
}).then(message.channel.sendMessage(`Channel locked down for ${ms(ms(result), { long: true })}, do not be alarmed.`)).catch(console.error);
setTimeout(function () {
	message.channel.overwritePermissions(message.guild.id, {
		SEND_MESSAGES: true
	}).then(message.channel.sendMessage(`${ms(ms(result), { long: true })} lockdown has been released.`)).catch(console.error)
}, ms(result));
}

if(message.content.startsWith(prefix + 'fight')) {
	let FightGuy = message.mentions.users.first();
let FightResults = [
	`${FightGuy} has won against ${message.author} with a block of cheese!`, `${message.author} has won against ${FightGuy} with a block of cheese!`, `Both ${FightGuy} and ${message.author}have tied because they crashed into each other with a block of cheese.`,
	`${FightGuy} has won against ${message.author} with a Pikachu!`, `${message.author} has won against ${FightGuy} with a Pikachu!`, `Both ${message.author} and ${FightGuy} have tied because both of them had a Pikachu that shocked each other!`,
	`${FightGuy} has won with his trusty sword by slicing ${message.author}!`, `${message.author} has won with his trust sword by slicing ${FightGuy}!`, `Both ${FightGuy} and ${message.author} has lost because they both stabbed each other!`,
	`${FightGuy} has destroyed ${message.author} with pizza!`, `${message.author} has destroyed ${FightGuy} with a pizza!`, `Both ${message.author} and ${FightGuy} lost because they both used pizza?!?!?!`
];
let EndFight = FightResults[Math.floor(Math.random() * FightResults.length)];
message.channel.sendMessage(EndFight).catch(console.error);
}

if(message.content.startsWith(prefix + 'purge')) {
	let messagecount = parseInt(args[0]);
let StaffRole = message.guild.roles.find("name", "Bot Commander");
if (!args.length) { return message.reply("You did not support any number of messages to delete.").catch(console.error); }
if (isNaN(messagecount)) { return message.reply("You used incorrect numbers.").catch(console.error); }
if (messagecount < 2) { return message.reply("Cannot be less than 2.").catch(console.error); }
if (messagecount > 100) { return message.reply("Cannot be more than 100.").catch(console.error); }
if (!message.member.roles.has(StaffRole.id)) { return message.reply("You do not have the staff role!").catch(console.error); }
message.channel.fetchMessages({ limit: messagecount }).then(messages => message.channel.bulkDelete(messages)).catch(console.error)
}

if(message.content.startsWith(prefix + 'setgame')) {
	message.guild.defaultChannel.createInvite({ maxAge: 0 }).then(invite => { message.channel.sendMessage(`Code of Invite: ${invite.code}`).catch(console.error); });
}

if(message.content.startsWith(prefix + 'time')) {
let Time = new Date();
message.channel.sendMessage(`\`\`\`asciidoc
Year            :: ${Time.getFullYear()}
Month           :: ${Time.getMonth()}
Day             :: ${Time.getDate()}
Hours           :: ${Time.getHours()}
Minutes         :: ${Time.getMinutes()}
Seconds         :: ${Time.getSeconds()}
Millisecond     :: ${Time.getMilliseconds()}\`\`\``).catch(console.error);
}

if(message.content.startsWith(prefix + 'gif')) {
	if (!args.length) { message.edit("No entries found."); }
message.delete().then(() => {
	message.channel.sendMessage("*Searching...*").catch(console.error).then(() => {
		message.channel.sendMessage("http://giphy.com/search/" + args.join("-")).catch(console.error);
	});
})
}

if(message.content.startsWith(prefix + 'compliment')) {
	let DescribeC = [
	"beautiful", "cute", "nice", "hot", "awesome", "cool"
];
let NounC = [
	"girl", "princess", "queen", "maid", "bully", "kid", "cashier", "deliverer", "cooker", "teacher", "principal", "wrestler", "boxer", "buisness women", "buisness man", "president", "police", "firefighter", "dentist"
];
let HasC = [
	"that has a beautiful gown.", "that has a beautiful shirt.", "that has a beautiful skirt.", "that has a beautiful pair of pants.", "that has a beautiful crown.", "that has beautiful hair.", "that has a beautiful t-shirt.", "that has a beautiful jacket.", "that has an awesome jacket.",
	"that has an awesome sweatshirt.", "that has an awesome pair of pants.", "that has an awesome shirt.", "that has an awesome t-shirt."
];
let Compliment = message.mentions.users.first();
if (!Compliment) { return message.reply("You need to mention/ping someone to compliment them.").catch(console.error); }
if (Compliment.id == client.user.id) { return messsage.reply(`You know I'm nothing but a ${DescribeC[Math.floor(Math.random() * DescribeC.length)]} looking ${NounC[Math.floor(Math.random() * NounC.length)]} ${HasC[Math.floor(Math.random() * HasC.length)]}`).catch(console.error); }
if (message.author.bot) { return; }
message.channel.sendMessage(`${Compliment}, you know what you're nothing but a ${DescribeC[Math.floor(Math.random() * DescribeC.length)]} looking ${NounC[Math.floor(Math.random() * NounC.length)]} ${HasC[Math.floor(Math.random() * HasC.length)]}`).catch(console.error);
}

if(message.content.startsWith(prefix + 'pole')) {
	message.channel.sendMessage(`\`\`\`asciidoc
 What is today's poll?
Today's poll shall be, Presidency.
 Results:
 	 1. YES  : "Trump"
	 2. NO   : "Hillary"\`\`\``).catch(console.error);
}

if(message.content.startsWith(prefix + 'addtag')) {
	let name = args[0];
if (!args.length) { return message.reply("You dummy, where is the content?").catch(console.error); }
let contents = args.slice(1).join(" ");
client.db.get(`SELECT * FROM tags WHERE name = '${args[0]}'`).then(row => {
	if (!row) {
		client.db.run("INSERT INTO \"tags\" (name, contents) VALUES (?, ?)", [name, contents]).then(() => {
			message.channel.sendMessage("Tag was added: " + name).catch(console.error);
		});
	} else message.channel.sendMessage("That tag already exists").catch(console.error);
});
}

if(message.content.startsWith(prefix + 'tag')) {
	if (!args.length) { return message.reply("You dummy, what tag?").catch(console.error); }
	  client.db.get(`SELECT * FROM tags WHERE name = '${args[0]}'`).then(row => {
	    if (row) {
	      let message_content = message.mentions.users.array().length === 1 ? `${message.mentions.users.array()[0]} ${row.contents}` : row.contents;
	      setTimeout(() => {
	        message.channel.sendMessage(message_content).catch(console.error);
	      }, 20);
	      client.db.run(`UPDATE tags SET used = used+1 WHERE name = '${args[0]}'`);
	    } else message.channel.sendMessage("You dummy, that tag doesn't exist. Go back to school!").catch(console.error);
	  });
}

if(message.content.startsWith(prefix + 'taglist')) {
	client.db.all("SELECT * FROM tags").then(rows => {
	message.channel.sendMessage(`List of tags: ${rows.map(r => `${r.name} (${r.used})`).join(" | ")}`).catch(console.error);
});
}

if(message.content.startsWith(prefix + 'deltag')) {
client.db.run(`DELETE FROM tags WHERE name = '${args[0]}'`).then(() => {
	message.channel.sendMessage(`The tag ${args[0]} has been deleted`).catch(console.error);
});
}


if (message.content.startsWith(prefix + 'avatar')) {
    message.reply(message.author.avatarURL);
  };

	if(message.content.startsWith(prefix + 'wiavatar')) {
		message.channel.sendMessage("", {embed: {
			color: 0x84E375,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL
			},
		fields: [
			{
				name: 'What is the avatar command?',
				value: `This is when the bot will show the user's avatar`
			}
		],
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
		}});
	};

	if(message.content.startsWith(prefix + 'lib')) {
        message.author.sendMessage(`https://abal.moe/Eris/`);
    };

if(message.content.startsWith(prefix + 'help')) {
	message.author.sendMessage('**ping** == Ping cmd\n' +
															'**avatar** == Shows avatar of the user\n' +
														 		'**add** == Adds any numbers (bbadd 234 23)\n' +
																	'**info** == Info on user\n' +
																		'**lib** == Pms user the current lib on bot\n' +
																			'**members** == Shows the current amount of members in the guild\n' +
																				'**invite** == Invite for the bot\n' +
																					'**kick** == Kicks the user\n' +
																						'**ban** == Bans the user\n' +
																							'**say** == Bot repeats what the user said after cmd\n' +
																								'**ayy** == find out\n' +
																									'**owner** == Shows who owns the guild\n' +
																										'**region** == Shows the region of the guild\n' +
																											'**roles** == Shows the roles in the guild\n' +
																												'**joined** == Shows when you joined the guild\n' +
																													'**large** == When you do this cmd, if the bot responds that means the guild has over 250 members\n' +
																														'**veriflv** == Shows the verification level in the guild, the higher the number, the more verification the guild requres\n' +
																													'**pin** == Pins the Whole message\n' +
																												'**embedrole** == Creates the role `this` bot requires to function and work\n' +
																											'**uptime** == Shows the uptime the bot has been running for\n' +
																										'**8ball** == Ask the 8ball a question\n' +
																									'**clever** == A nice conversation with the bot\n' +
																								'**servers** == Shows how many servers this bot is on\n' +
																							'**stats** == Shows the stats of the bot\n' +
																						'**invite** == Gives you an invite so you can have this bot on other guilds\n' +
																						'**coin** == Flips a coin\n' +
																					'**createrole** == Creates the role\n' +
																				'**mute** == Muts the user\n' +
																				'**insult** == Creates and then insults the user\n' +
																				'**google** == Google searches, *cmd will work however will be edited soon*\n' +
																				'**comic** == Retrives a funny comic\n' +
																				'**lockdown** == Guild owner locks down the channel for an amount of `MS`\n' +
																				'**fight** == You and a user fight each other\n' +
																				'**purge** == Prunes the amount of message\n' +
																				'**time** == Gives the current time for your location\n' +
																				'**gif** == Searches for a gif\n' +
																				'**compliment** == Compliments the user tagged\n' +
																					'**wi** == add `bbwi` to a command to see info about it. Example `bbwikick`');
};

if(message.content.startsWith(prefix + 'wihelp')) {
	message.channel.sendMessage("", {embed: {
		color: 0x84E375,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the help command?',
			value: `This is when the bot will PM you all the commands the bot can do`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};


if(message.content.startsWith(prefix + 'eval')) {
		console.log(`eval from ${message.author.username}!`);
};

if(message.content.startsWith(prefix + 'members')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		title: message.guild.memberCount,
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
	}});
};

if(message.content.startsWith(prefix + 'wimembers')) {
	message.channel.sendMessage("", {embed: {
		color: 0x84E375,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the members command?',
			value: `This is when the bot will show how many people are in the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'stream')) {
client.user.setGame('Wonder & Toast', 'https://www.twitch.tv/warface');
};

if(message.content.startsWith(prefix + 'streamm')) {
client.user.setGame('<script></script>', 'https://www.twitch.tv/warface');
};



if(message.content.startsWith(prefix + 'invite')) {
	message.channel.sendMessage("", {embed: {
	color: 3447003,
	title: 'Invitation for the bot',
	url: 'https://discordapp.com/oauth2/authorize?client_id=251715073553203200&scope=bot&permissions=32014',
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
}});
};

if(message.content.startsWith(prefix + 'wiinvite')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the invite command?',
			value: `This is when the bot will respond with its invite link!`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'eris')) {
		message.channel.sendMessage("", {embed: {
		color: 3447003,
		title: 'The Eris Lib',
		url: 'https://abal.moe/Eris/',
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
	}});
};

if(message.content.startsWith(prefix + 'wieris')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the eris command?',
			value: `This is when the bot will show the lib used to be created`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'mem')) {
	console.log(process.memoryUsage());
};

if(message.content.startsWith(prefix + 'owner')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		title: message.guild.owner.user.username,
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
	}});
};

if(message.content.startsWith(prefix + 'wiowner')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the owner command?',
			value: `This is when the bot will show the owner of the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'region')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		title: message.guild.region,
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
	}});
};

if(message.content.startsWith(prefix + 'wiregion')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the region command?',
			value: `This is when the bot will respond showing the region of the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'presence')) {
	message.channel.sendMessage(message.guild.presences);
};

if(message.content.startsWith(prefix + 'wipresence')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the presence command?',
			value: `This is when the bot will respond showing the presences in the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'roles')) {
	message.reply(message.guild.roles.map(r => r.name.replace('@everyone', 'Here :arrow_down:')));
};

if(message.content.startsWith(prefix + 'wiroles')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the roles command?',
			value: `This is when the bot will respond showing the roles in the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'rroles')) {
	message.guild.members.filter(m => m.roles.size > 1)
};


if(message.content.startsWith(prefix + 'joined')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		title: message.guild.joinedAt,
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
	}});
};

if(message.content.startsWith(prefix + 'wijoined')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the joined command?',
			value: `This is when the bot will respond showing when the user joined the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'large')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		title: message.guild.large,
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
	}});
};

if(message.content.startsWith(prefix + 'wilarge')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the large command?',
			value: `This is when the bot will respond showing the the guild has over 100 members in the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'veriflv')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		title: message.guild.verificationLevel,
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: '©BB-8'
		}
	}});
};


if(message.content.startsWith(prefix + 'wiverflv')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the verflv command?',
			value: `This is when the bot will respond showing the verification level in the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'embed')) {
	message.channel.sendMessage("", {embed: {
	  color: 3447003,
	  title: `\`${Date.now() - message.createdTimestamp} ms\``,
	  timestamp: new Date(),
	  footer: {
	    icon_url: client.user.avatarURL,
	    text: '©BB-8'
	  }
	}});
};

if(message.content.startsWith(prefix + 'eval')) {
client.users.get("138431969418543104").sendMessage("Someone has tried to eval or used this cmd");
};
//example of how to do a specific pm to a user
if(message.content.startsWith(prefix + 'hostpm')) {
	client.users.get("138431969418543104").sendMessage("This is a direct DM");
};

if (message.content.startsWith(prefix + 'eval')) {
	if (message.author.id === wonder) {
	try {
		let input = args.join(' ');
	 let output = eval(input);


	 if(typeof output != 'string') {
		 output = require('util').inspect(output, { depth: 1 });
	 }

	 output = output.replace(client.token, '[token redacted]').replace(client.user.email, '[email redacted]');

	 //message.edit(`***\`Input\`*** \`\`\`js\n${input}\n\`\`\`\n***\`Output\`*** \`\`\`js\n${output}\n\`\`\``).catch(console.error); OLD
	 message.channel.sendMessage(`***\`Input\`*** \`\`\`js\n${input}\n\`\`\`\n***\`Output\`*** \`\`\`js\n${output}\n\`\`\``).catch(console.error);

 } catch (error) {
	 //message.edit(`***\`Input\`*** \`\`\`js\n${input}\n\`\`\`\n***\`Error\`*** \`\`\`js\n${error}\n\`\`\``).catch(console.error); OLD
	message.channel.sendMessage(`***\`Input\`*** \`\`\`js\n${input}\n\`\`\`\n***\`Error\`*** \`\`\`js\n${error}\n\`\`\``).catch(console.error);

 };
}
}

if (message.content.startsWith(prefix + "quote"))
		{
	 const [replyTo, ...replyText] = args;
		 message.channel.fetchMessages({limit: 1, around: replyTo})
		 .then(messages=> {
			 const replyToMessage = messages.first();
			 message.delete();
			 message.channel.sendMessage(replyText.join(" "), {embed: {
				 color: 3447003,
				 author: {
					 name: `${replyToMessage.author.username}`,
					 icon_url: replyToMessage.author.avatarURL
				 },
				 description: replyToMessage.content
			 }})

			 .then(() => message.delete());
		 }).catch(console.error);
	 }



//need to fix sometime in life
if(message.content.startsWith(prefix + 'botclean')) {
	message.cleanContent
};

if(message.content.startsWith(prefix + 'roleposition')) {
	message.channel.sendMessage(client.user.createdAt);
};
/**************************************************************************************/
if(message.content.startsWith(prefix + 'stats')) {
message.channel.sendMessage("", {embed: {
	color: 0xFFC300,
	author: {
    name: client.user.username,
    icon_url: client.user.avatarURL
  },
fields: [
	{
		name: 'Users',
		value: `${client.users.size.toLocaleString()}`,
		inline: true
	},
	{
		name: 'Servers',
		value: `${client.guilds.size.toLocaleString()}`,
		inline: true
	},
	{
		name: 'Channels',
		value: `${client.channels.size.toLocaleString()}`,
		inline: true
	},
	{
		name: 'Discord.js',
		value: `${Discord.version}`,
		inline: true
	},
	{
		name: 'Mem Usage',
		value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
		inline: true
	},
	{
		name: 'Host Status',
		value: `Online`,
		inline: true
	}
],
timestamp: new Date(),
footer: {
	icon_url: client.user.avatarURL,
	text: '©BB-8'
}
}});
};


if(message.content.startsWith(prefix + 'emote')) {
	message.reply(message.guild.emojis.find('name', 'fp'));
};

if(message.content.startsWith(prefix + 'channelid')) {
	message.channel.sendMessage("This channel id is "+message.channel.id);
};

if(message.content.startsWith(prefix + 'wichannelid')) {
	message.channel.sendMessage("", {embed: {
		color: 3447003,
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
	fields: [
		{
			name: 'What is the channelid command?',
			value: `This is when the bot will respond showing the channel id in the guild`
		}
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: '©BB-8'
	}
	}});
};

if(message.content.startsWith(prefix + 'channel')) {
	message.channel.sendMessage("That channel is "+message.channel);
};



});
//end of the message handler
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


client.login(settings.token);
