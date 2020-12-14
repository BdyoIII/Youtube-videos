const commando = require('discord.js-commando');
module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'misc',
            memberName: 'ping-cmd',
            description: 'Tells the bots ping.',
            argsType: 'multiple',
            guildOnly: false, 
            throttling: {
                usages: 5,
                duration: 120,
            },
        })
    }
    async run ( message, args ) {
        
        message.channel.send('Pinging...').then(sent => {
            sent.edit(`Pong Took ${sent.createdTimestamp - message.createdTimestamp}ms`)
        })
    }
}