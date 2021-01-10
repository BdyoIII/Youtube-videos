const { MessageEmbed } = require("discord.js");
const sendError = require('../../util/error')
const { client } = require("discord.js");

const commando = require('discord.js-commando');
module.exports = class queueCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            aliases: ["q", "songlist", "song-list"],
            group: 'music',
            memberName: 'queue-music',
            description: 'Shows the current queue in the server.',
            clientPermissions: [
                'SEND_MESSAGES'
            ],
            argsType: 'multiple',
            guildOnly: true, 
            throttling: {
                usages: 2,
                duration: 13,
            },
        })
    }
    async run ( message, args ) {
        const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("There is nothing playing in this server.", message.channel);

    let currentPage = 0;
    const embeds = generateQueueEmbed(message, serverQueue.songs);

    const queueEmbed = await message.channel.send(
      `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      embeds[currentPage]
    );

    try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("⏹");
      await queueEmbed.react("➡️");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }

    const filter = (reaction, user) =>
      ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    });
  }
};

function generateQueueEmbed(message, queue) {
  let embeds = [];
  let k = 10;

  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");

    const embed = new MessageEmbed()
      .setAuthor("Server Songs Queue", "https://github.com/ThatGuyJamal/DeepWebAPI-Git-host/blob/master/src/assets/Music.gif")
      .setThumbnail(message.guild.iconURL())
      .setColor("RANDOM")
      .setDescription(`**Current Song - [${queue[0].title}](${queue[0].url})**\n\n${info}`)
      .setTimestamp();
    embeds.push(embed);
  }

  return embeds;
    
}