const { embed } = require('../templates/completeEmbed');

module.exports = {
  
  name: 'invite',
  description: 'Invite the bot',
  category: 'Misc',
  execute(message, args){
    message.channel.send({ embed: embed('Click the link below to invite the bot!', '**https://discord.com/oauth2/authorize?client_id=757481381172609115&scope=bot&permissions=338690110**', message.author) });
  }

};
