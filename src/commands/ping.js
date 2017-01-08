//for this to work for you, you need to install indev
exports.run = function(client, message, args) {
	message.channel.sendMessage(`Pong! \`${Date.now() - message.createdTimestamp} ms\``)
};
