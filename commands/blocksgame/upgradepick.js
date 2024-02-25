const { Command } = require("../../utils");

const BuyPickaxe = new Command("upgradepick","",{slash:false, prefix:true});

BuyPickaxe.prefixCommandInfo.setShortName("up")

BuyPickaxe.setPrefixAction(async(m,b)=>{
    const config = b.data["ui"];
    const uid = m.author.id;
    const profile = config.db[uid];
    const cost = (()=>{
        let tempcost = 25;
        for(let i = 1; i<profile.picklvl+1; i++){
            tempcost+=Math.floor(tempcost/2);
        }
        return tempcost;
    })()
    if(profile.coins<cost || profile.pickaxelvl<1) return m.channel.send("Недостаточно монеток для улучшения кирки, либо кирка отсутствует");
    profile.coins-=cost;
    profile.picklvl+= 1;
    profile.blockpermsg = profile.picklvl+Math.floor(profile.picklvl*0.125);
    m.channel.send(`Вы потратили ${cost} монеток для улучшения кирки. Уровень кирки теперь равен ${profile.picklvl}, у вас осталось ${profile.coins} монеток.`);
    BuyPickaxe.writeConfig(config, "kot.userinfo");
});

module.exports = BuyPickaxe;