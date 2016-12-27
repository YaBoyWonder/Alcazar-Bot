"use strict";

const Discord = require('discord.js');
const settings = require('./settings.json');
const ddiff = require('return-deep-diff');
const client = new Discord.Client({fetchAllMembers: true})
const wonder = "138431969418543104";

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
			color: 008000,
			title: "I've been removed from server **" + guild.name + "**",
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

			if(message.content.startsWith(prefix + 'channel')){
				message.channel.sendMessage("${this.client.channels.size}");
			};

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

if(message.content.startsWith(prefix + 'mom')) {
	message.channel.sendMessage(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`);
}

	/**	if(message.content.startsWith(prefix + 'ppp'))	 {
			.setColor(8450847)
			.addField('Mem Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
			.addField('Uptime', Time.difference(client.uptime * 2, client.uptime).toString(), true)
			.addField('\u200b', '\u200b', true)
			.addField('Servers', client.guilds.size.toString(), true)
			.addField('Channels', client.channels.size.toString(), true)
			.addField('Users', client.guilds.map(g => g.memberCount).reduce((a, b) => a + b), true)
			.addField('YAMDBF', `v${version}`, true)
			.addField('Discord.js', `v${Discord.version}`, true)
			.addField('\u200b', '\u200b', true)
			.addField('YAMDBF Info', 'https://yamdbf.js.org', true)
			.setFooter('Wonder', client.user.avatarURL)
			.addField('\u200b', '\u200b', true)
			.setTimestamp();

		message.channel.sendEmbed(embed);
	};*/





			 if(message.content === prefix + "servers") {
			 		message.channel.sendMessage("I'm on **" + client.guilds.size + "** servers.");
			 }


/**if(message.content.startsWith(`<@${251715073553203200}>`) {
	message.channel.sendMessage("Testing this fool");
};*/
if (message.content.startsWith(prefix + "kick")) {
  // I'll make a code example on how to check if the user is allowed, one day!
    let userToKick = message.mentions.users.first();
    //we need to get a *GuildMember* object, mentions are only users. Then, we kick!
    message.guild.member(userToKick).kick();
  // see I even catch the error!
}

if (message.content.startsWith(prefix + "ban")) {
    let userToBan = message.mentions.users.first();
    message.guild.member(userToBan).ban();

}
/**
var list = ["Yes", "No", "In the near future", "Possibly"];

if(message.content.startsWith(prefix + 'test')) {
	message.channel.sendMessage("Ayy " + things[Math.floor(Math.random() * list.length)]);
};
*/
if(message.content.startsWith(prefix + 'edit')) {
message.channel.sendMessage("Blah").then(m => m.edit("meh").then(m => m.edit(":sweat_drops:").then(m => m.edit(":eggplant:").then(m => m.edit(":thinking:").then(m => m.edit(":christmas_tree: :santa: :christmas_tree: :santa: :christmas_tree:"))))));
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
	}else

	if(message.content.startsWith(prefix + `send`)) {
		client.channels.get(`255968735930613761`).sendMessage(`Hello`);
	}else


/**if(message.content.startsWith(prefix + "input")) {
	function Eval(msg, args)    {
	    const input = ':arrow_right: **Input:**\n```js\n' + args.join(' ') + '\n```';
	    return Promise.all([
	        new Promise((resolve, reject) => {
	            let ev;

	            try {
	                ev = eval(args.join(' '));

	                if(ev && typeof ev.then == 'function' && typeof ev.catch == 'function')   {
	                    ev.then(resolve).catch(reject);
	                    return;
	                }
	                resolve(ev);
	            }   catch(err)    {
	                reject(err);
	            }
	        }),
	    ]).then(([res, msg]) => {
	        let out;
	        if(typeof res == 'object' && typeof res != 'string')  {
	            out = require('util').inspect(res);
	            if(typeof out == 'string' && out.length > 1900)   {
	                out = res.toString();
	            }
	        }   else {
	            out = res;
	        }

	        return msg.edit(input + ':white_check_mark: **Output:**\n```js\n' + out + '\n```');
	    }).catch(err => {
	        return msg.edit(input + ':x: **Error:**\n```js\n' + (err.message || err) + '\n```');
	    });
	}
}*/

/**if(message.content.startsWith(prefix + 'uptime')) {
	client.uptime(moment().format('MMMM Do YYYY, h:mm:ss a'));
};*/

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


	if (message.content.startsWith(prefix + 'info')) {
        message.channel.sendMessage(`${message.author.username}:
**Username:** ${message.author.username}#${message.author.discriminator}
**ID:** ${message.author.id}
**Avatar URL:** ${message.author.avatarURL}`);
	  };

if (message.content.startsWith(prefix + 'avatar')) {
    message.reply(message.author.avatarURL);
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
																						'**invite** == Gives you an invite so you can have this bot on other guilds');
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

if(message.content.startsWith(prefix + 'presence')) {
	message.channel.sendMessage(message.guild.presences);
};

if(message.content.startsWith(prefix + 'roles')) {
	message.reply(message.guild.roles.map(r => r.name.replace('@everyone', 'Here :arrow_down:')));
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
		value: `${client.users.size.toLocaleString()}`
	},
	{
		name: 'Servers',
		value: `${client.guilds.size.toLocaleString()}`
	},
	{
		name: 'Channels',
		value: `${client.channels.size.toLocaleString()}`
	},
	{
		name: 'Discord.js',
		value: `${Discord.version}`
	},
	{
		name: 'Mem Usage',
		value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
	}
],
timestamp: new Date(),
footer: {
	icon_url: client.user.avatarURL,
	text: '©BB-8'
}
}});
};



	/**if(message.content.startsWith(prefix + 'chatt')) {
	var Cleverbot = require('cleverbot-node');
   var cleverbot = new Cleverbot;
	 var cleverMessage;
     Cleverbot.prepare(function(){
      message.channel.sendMessage(cleverMessage, function (response) {
 			}).catch(error => console.log(error));
     });
};*/

/**if(message.content.startsWith(prefix + 'emote')) {
message.guild.emojis.find('name', 'emoji name')
	message.reply(`Hello! ${230066884677074945}`);
};*/

if(message.content.startsWith(prefix + 'emote')) {
	message.reply(message.guild.emojis.find('name', 'fp'));
};

if(message.content.startsWith(prefix + 'channelid')) {
	message.channel.sendMessage("This channel id is "+message.channel.id);
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
