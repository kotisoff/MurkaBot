const Command = require("../../utils/Command");

const convert = new Command("convertblocks", "", {
  prefix: true,
  slash: false
});

convert.prefixCommandInfo.setRuName("конверт").setShortName("cb");

convert.setPrefixAction(async (m, b) => {
  const db = b.data["ui"].db;
  const uid = m.author.id;
  const profile = db[uid];
  const args = m.content.split(" ").slice(1);
  const all = ["all", "всё", "все"];
  if (!args[0])
    m.channel.send(
      "--convertblocks all (всё, все) - разменять все блоки на монеты.\n--convertblocks <количество> - конвертировать столько монет, сколько указано в команде."
    );
  if (all.includes(args[0])) {
    const converted = (profile.blocks / 10) | 0;
    profile.coins += converted;
    profile.blocks = profile.blocks % 10;
    return m.channel.send(
      `Конвертировано ${converted} монеток. У вас осталось ${profile.blocks} блоков.`
    );
  }
  const coinsToConvert = parseInt(args[0]);
  if (profile.blocks / 10 >= coinsToConvert && coinsToConvert >= 0) {
    profile.blocks -= 10 * coinsToConvert;
    profile.coins += coinsToConvert;
    m.channel.send(
      `Конвертация завершена успешно. У вас осталось ${profile.blocks} блоков.`
    );
  } else
    m.channel.send(
      "Недостаточно блоков для конвертации. Конвертация отменена."
    );
});

module.exports = convert;
