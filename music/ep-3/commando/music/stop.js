const commando = require('discord.js-commando');
module.exports = class StopCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop-command',
            description: '..',
            userPermissions: [
                'CONNECT',
            ],
            clientPermissions: [
                'SPEAK',
                'CONNECT'
            ],
            argsType: 'multiple',
            guildOnly: true, 
            throttling: {
                usages: 1,
                duration: 35,
            },
        })
    }
    async run ( message, args ) {
        
        const { MessageEmbed } = require('discord.js')
        const sendError = require('../../Util/error')
        const serverQueue = message.client.queue.get(message.guild.id);

        const channel = message.member.voice.channel
        if (!channel) {
            return sendError("You are not in the corrent voice channel.", message.channel)
        } else if (!serverQueue) {
            return sendError("There is no music queue.", message.channel)
        }
        serverQueue.song = [];
        serverQueue.connection.dispatcher.end("I have stopped the music.", message.channel)
        message.react('👍')

    }
}
