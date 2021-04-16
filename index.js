const fs = require('fs');
const http = require('http');
const Discord = require('discord.js');
const express = require('express');
const { prefix} = require('./config.json');
const token = process.env.TOKEN;
const { status } = require('./templates/status.js');
const { alias } = require('./templates/alias.js');
const fetch = require('node-fetch');
const { embed } = require('./templates/completeEmbed');
const client = new Discord.Client(); 
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 28000);
app.listen(process.env.PORT || 5000, () => console.log('Bound to port'));

//Set Status
const setStatus = () => {
  const options = status(prefix, client);
  const random = Math.floor(Math.random() * options.length);
  client.user.setPresence(options[random]);
};

client.once('ready', () => {
  console.log('Bot logged in!');
  setInterval(setStatus, 3000);
});



client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('message', async message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  if(command=='invite')
     return message.channel.send({ embed: embed('Click the link below to invite the bot!', 'https://discord.com/oauth2/authorize?client_id=832492636723609630&scope=bot&permissions=338690110', message.author) });
    let data = await fetch('http://meme-api.herokuapp.com/gimme/'+command)
      .then(res => res.json())
    if(data.url)
      message.channel.send({ embed: embed(command, data.title, message.author, data.url) });
    else
      message.channel.send({ embed: embed("Result doesn\'t contain any images", "We can't load this post :/", message.author) });
  
});


client.login(token);
