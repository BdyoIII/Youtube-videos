const commando = require('discord.js-commando');
const { MessageEmbed } = require("discord.js")

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'misc',
            memberName: 'help-command',
            description: '...',
            argsType: 'multiple',
            guildOnly: true, 
            throttling: {
                usages: 3,
                duration: 30,
            },
        })
    }
    async run ( message, args ) {
        const embed = new MessageEmbed() //! Feel free to change all of this code to your liking!
        .setTitle('Commands')
        .setTimestamp()
        .setDescription('For more info about bot develpment join my support server!')
        .addField('Server', '[Click me to join us!](https://discord.gg/NbqBQbaejS)', false)
        .addField("ping", `Tells the bots ping!`)
        .addField("`play`", `Plays music.`)
        .addField("More comming soon!", `What he said!`)
  
        .setFooter('Im still in develpment and only have a few commands.')
        .setAuthor('Music Tutorial Bot Coded by ThatGuyJamal#2695')
        .setThumbnail(message.client.user.displayAvatarURL())
        .setColor('RED')
        message.channel.send(embed)
    }
}