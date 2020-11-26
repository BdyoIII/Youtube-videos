const Discord = require('discord.js')
const { prefix, token} = require('./config.json')
const path = require('path')
const join = require('path')
const { CommandoClient } = require('discord.js-commando')
const config = require('./config.json')

const client = new CommandoClient({
    commandPrefix: "!",
    owner: "370637638820036608",
    invite: "https://discord.gg/NbqBQbaejS"
})

client.registry
    .registerDefaultTypes()

    .registerGroups([
        ['misc', 'misc commands.'],
    ])
    
    .registerDefaultGroups([
    ])
    .registerDefaultCommands({
        help: true, 
        ping: false,
        eval: false,
        unknownCommand: false, //! Use this if you dont want the bot replying to all "incorrect" command usages.
    })
    .registerCommandsIn(path.join(__dirname, 'commando'));
    
    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
        client.user.setActivity('with Commando');
    });
    
    client.on('error', console.error);

client.login(config.token)