const Command = require("../../../utils/Command");

const data = new Command("balance", "", { prefix: true, slash: false });

data.prefixCommandInfo.setRuName("баланс").setShortName("bal");

data.setPrefixAction(async (m, b) => {
  const data = b.data["ui"];
  const uid = m.author.id;
  const profile = data.db[uid];
  const args = m.content.split(" ").slice(1);
  if (!args[0])
    return m.channel.send(`Баланс <@!${uid}>: ${profile.coins} монеток`);
  else {
    const id = args[0].replace(/\D/g, "");
    if (id) m.channel.send(`Баланс ${args[0]}: ${data.db[id].coins} монеток`);
  }
});

module.exports = data;
