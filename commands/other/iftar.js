const Discord = require("discord.js");
const axios = require('axios');





        exports.run = (client, message, args) => {
            const city = args[0];
            if (!city) return message.channel.send('Şehir adı girmelisiniz.');
            axios.get(`https://api.collectapi.com/pray/single?ezan=Ak%C5%9Fam&data.city=${city.toLowerCase()}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": "apikey 1pHbemnN6LjPR6UnIYgwu0:3Fi6aBZPIFndOl10RH5Iyw"
                }
            }).then(res => {
                const messageEmbed = new Discord.MessageEmbed().setDescription(`
                   > **${city}** şehri için iftar saati **${res.data.result[0].time}.**
                   \`\`\`Kalan Süre: ${res.data.result[0].hour} ${res.data.result[0].min}\`\`\`
                `);
        
                message.channel.send(messageEmbed);
            }).catch(err => {
                message.channel.send('Bir sorun ortaya çıktı. Komudu doğru kullandığınızdan emin olun.');
                console.log(err);
            });
             
};
       exports.conf = {
        aliases: ['p', 'pong', 'uptime',],
        permLevel: 0
};
           exports.help = {
               name: 'iftar',
               description: 'İftar vaktini yazar. Sadece küçük harfler ve ingilizce karakter destekler.',
               usage: 'iftar istanbul'
 };
