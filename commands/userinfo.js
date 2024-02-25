const discord = require("discord.js");
const Command = require("../utils/Command");

const UserInfo = new Command("userinfo", "UserInfo", {
  slash: false,
  prefix: true
});

UserInfo.prefixCommandInfo.setRuName("юзеринфо").setShortName("ui");

const userInfoExample = (name) => {
  const ui = {};
  ui.username = name;
  ui.level = 0;
  ui.experience = 0;
  ui.blocks = 0;
  ui.coins = 0;
  ui.blockpermsg = 0; // Blocks per message
  ui.picklvl = 0;
  ui.bonuses = {
    simple: 0,
    extra: 0
  };
  ui.warns = 0;
  return ui;
};

const Names = [
  "Информация о пользователе",
  "Уровень",
  "Кол-во опыта",
  "Блоков",
  "Монеток",
  "Кол-во блоков за 1 сообщение",
  "Уровень кирки",
  "Бонусы",
  "Предупреждения",
  "Простые бонусы",
  "Экстра-бонусов"
];

const filterData = (obj) => {
  const values = [null, undefined, NaN];
  if (typeof obj === "object" && !values.includes(obj)) {
    const keys = Object.keys(obj);
    const vals = Object.values(obj);
    return keys
      .map((v, i) => `${Names[Names.length - 2 + i]}: ${vals[i]}`)
      .join(", ");
  }
  return obj;
};

UserInfo.setSharedThread((bot) => {
  bot.data["ui"] = UserInfo.getConfig("kot.userinfo").config;
  const config = bot.data["ui"];
  if (!config.db) config.db = {};
  bot.on("messageCreate", async (message) => {
    if (message.author.bot || message.content.startsWith(bot.config.bot.prefix))
      return;
    if (message.channel.type == discord.ChannelType.DM);
    const uid = message.author.id;
    if (!config.db[uid])
      config.db[uid] = userInfoExample(message.author.username);
    const profile = config.db[uid];
    profile.experience++;
    profile.coins++;
    profile.blocks += profile.blockpermsg;
    if (profile.experience >= profile.level * 5) {
      profile.level++;
      profile.experience = 0;
      // message.channel.send(`Пользователь <@${uid}> поднял уровень до ${profile.level}!`);
    }
  });
  setInterval(() => {
    UserInfo.writeConfig(config);
  }, 60000);
});

UserInfo.setPrefixAction((m, b) => {
  const uid = m.author.id;
  const config = b.data["ui"];
  if (!config.db[uid]) config.db[uid] = userInfoExample(m.author.username);
  const data = config.db[uid];
  m.channel.send(
    Object.keys(data)
      .map((v, i) => Names[i] + ": " + filterData(data[v]))
      .join("\n") + `\nДо следующего уровня: ${data.level * 5}`
  );
  UserInfo.writeConfig(config);
});

module.exports = UserInfo;
