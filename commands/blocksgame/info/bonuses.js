const { Command } = require("../../../utils");

const data = new Command("bonuses", "", {prefix:true, slash:false});

data.prefixCommandInfo.setRuName("бонусы").setShortName("b")

data.setPrefixAction(async(m,b)=>{
    const data = b.data["ui"];
    const uid = m.author.id;
    const profile = data.db[uid];
    const args = m.content.split(" ").slice(1);
    if(!args[0]) return m.channel.send(`Бонусы <@!${uid}>:\n- Простые бонусы: ${profile.bonuses.simple}\n- Экстра бонусы: ${profile.bonuses.extra}`);
    else {
        const id = args[0].replace(/\D/g,'');
        if(id){ 
            const user = data.db[id];
            return m.channel.send(`Бонусы ${args[0]}:\n- Простые бонусы: ${user.bonuses.simple}\n- Экстра бонусы: ${user.bonuses.extra}`);
        }
        else return m.channel.send(`Ты чо ахуел?`)
    }
});

module.exports = data;