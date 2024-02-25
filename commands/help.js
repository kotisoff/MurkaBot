const { Collection, AttachmentBuilder } = require("discord.js");
const Command = require("../utils/Command");

const help = new Command("help", "", { prefix: true, slash: false });
const logger = help.logger;

help.prefixCommandInfo
  .setName("help")
  .setShortName("h")
  .setRuName("хелп")
  .setShortRuName("х");

help.setPrefixAction(async (m, b) => {
  const help = [];
  const collection = new Collection();
  collection.concat(b.prefCmd, b.interCmd);
  collection.forEach((v) => {
    const command = {};
    if (v.isPrefix) command.prefix = v.prefixCommandInfo;
    if (v.isSlash) command.slash = v.slashCommandInfo;
    help.push(command);
  });
  console.log(collection, help);
  m.channel.send("Хелпа щас в разработке...");
  m.channel.send("... но пока я могу продемонстрировать вот это недоразумение");
  m.channel.send(help.toString());
});

module.exports = help;
