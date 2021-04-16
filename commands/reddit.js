const fetch = require('node-fetch');
const { embed } = require('../templates/completeEmbed');

module.exports = {
  
  name: 'reddit',
  description: 'Get results from a subreddit',
  category: 'Content',
  async execute(message, args){
    let data = await fetch('http://meme-api.herokuapp.com/gimme/'+args.join(' '))
      .then(res => res.json())
    if(data.url)
      message.channel.send({ embed: embed(args.join(' '), data.title, message.author, data.url) });
    else
      message.channel.send({ embed: embed("Result doesn\'t contain any images", "We can't load this post :/", message.author) });
  }

};
