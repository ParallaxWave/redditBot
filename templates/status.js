module.exports = {
    status( prefix, client ){
        return [
      { activity: { name: `${prefix}invite`, type: "PLAYING" }, status: 'online' },
      { activity: { name: `${prefix}memes`, type: "PLAYING" }, status: 'online' },
      { activity: { name: `${client.guilds.cache.size} servers`, type: "WATCHING" }, status: 'online' }
    ]
  }
}
