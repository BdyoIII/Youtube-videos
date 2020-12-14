const { fuchsia } = require('color-name');
const commando = require('discord.js-commando');
module.exports = class StopCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'stop-pause-command',
            description: '...',
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
        }
         else if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            message.channel.send('i have paused the music.',)
        }
        return sendError("There is nothing playing in your server.", message.channel)
    }
}
