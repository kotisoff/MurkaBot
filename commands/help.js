const { Collection } = require("discord.js");
const { Command } = require("../utils");

const help = new Command("help","", {prefix:true, slash:false});

help.setPrefixAction(async(m,b)=>{
    const help = [];
    b.commands.forEach((v)=>{
        const prefix = (v.isPrefix) ? v.prefixCommandInfo : undefined;
        const slash = (v.isSlash) ? v.slashCommandInfo : undefined;
        help.push({prefix,slash});
    })
})