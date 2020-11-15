require('dotenv').config()
const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', onReady);

const servers = [
  'Agride',
  'Brumen',
  'Crocabulia',
  'Eratz',
  'Furye',
  'Julith',
  'Meriana',
  'Merkator',
  'Nidas',
  'Ush',
  'Pandore'
];
const previousCheck = {};

async function onReady() {
  const channel = await client.channels.fetch('777665616643358723');
  setInterval(checkModerator, 1000);
}

async function checkModerator() {
  for (const server of servers) {
    try {
      const response = await axios.get(`https://panel.snowbot.eu/api/moderatorCheckerPC/checkModerator.php?gameServer=${server}`);

      if (previousCheck[server] && previousCheck[server] !== response.data) {
        if (response.data === 'moderatorChecker = true') {
          const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Information')
            .setDescription(`Un modérateur est présent sur le serveur [${server}]`)
            .setTimestamp();
          channel.send(embed);
        } else {
          const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Information')
            .setDescription(`Il n'y a plus de modérateur sur le serveur [${server}]`)
            .setTimestamp();
          channel.send(embed);
        }
      }

      previousCheck[server] = response.data;
    } catch {};
  }
}
