const Discord = require("discord.js");
const Canvas = require('canvas');





exports.run = async (client, message, args) => {
    const hatakodu = args.slice(0).join(' '); 
    const canvas = Canvas.createCanvas(304, 150);
	const context = canvas.getContext('2d');
    
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/827597586940035093/850395834662649866/8mkudb7.png');

	context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeRect(0, 0, canvas.width, canvas.height);

	context.font = '20px sans-serif';

	context.fillStyle = '#000000';

	context.fillText(hatakodu, 55, 60);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'hata-mesajı.png');

	const bu = await message.channel.send(attachment);
    bu.react("1️⃣")
    bu.react("2️⃣")
    bu.react("3️⃣")
	const filter = (reaction, user) => {
		return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
	};
	
	bu.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
		.then(collected => {
			const reaction = collected.first();
	
			if (reaction.emoji.name === '1️⃣') {
				message.reply('Ben de öyle düşünmüştüm.');

			} else if (reaction.emoji.name === '2️⃣') {
				message.reply('Allah Allah? Nasıl hayır?');

			} else if (reaction.emoji.name === '3️⃣') {
				message.reply('Tamam böyle bir şey yaşanmadı :)');

			}
		})
		.catch(collected => {
			message.reply('Ne yani? Hiç bir şey olmadı mı? Niye işaretlemedin artık geçti borun pazarı sür eşeğini niğdeye.');
		});

};

exports.conf = {
aliases: ['p', 'pong', 'uptime',],
permLevel: 0

};

exports.help = {
name: 'hata',
description: 'Windows hata menusu oluşturur :).',
usage: 'hata bişiler'
};
