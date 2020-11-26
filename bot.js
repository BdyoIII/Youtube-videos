const Discord = require('discord.js')
const { CommandoClient } = require('discord.js-commando')
const {token, prefix} = require()
const path = require('path')
const config = require('./config.json')

const client = new CommandoClient({
    commandPrefix: "",
    owner: "",
    invite: ""
})



client.login(config.token)