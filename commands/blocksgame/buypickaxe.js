const Command = require("../../utils/Command");

const BuyPickaxe = new Command("buypickaxe", "", {
  slash: false,
  prefix: true
});

BuyPickaxe.prefixCommandInfo.setShortName("bp").setRuName("купитькирку");
BuyPickaxe.getConfig("kot.userinfo");

BuyPickaxe.setPrefixAction(async (m, b) => {
  const config = b.data["ui"];
  const uid = m.author.id;
  const profile = config.db[uid];
  if (profile.picklvl > 0) return m.channel.send("У вас уже есть кирка!");
  if (profile.coins < 10)
    return m.channel.send(
      "К сожалению, в данный момент у вас не хватает монет для приобретения кирки."
    );
  profile.coins -= 10;
  profile.picklvl = 1;
  profile.blockpermsg = 1;
  m.channel.send("Вы успешно купили кирку за 10 монеток!");
  BuyPickaxe.writeConfig(config);
});

module.exports = BuyPickaxe;
