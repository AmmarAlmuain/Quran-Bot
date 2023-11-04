require("dotenv").config();
const keepAlive = require("./server");
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const getVerses = require("../utils/getVerses");
const { AnythingModel } = require("./database/models/anything");
const mongoose = require("mongoose")

try {
    mongoose.connect(process.env.DB_CONNECTION_URI)
    console.log("Database is connected!")
} catch(error) {
    console.log(error)
}

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (client) => {
  console.log(`${client.user.username} is ready!`);
});

client.on("messageCreate", async (message) => {
  if(message.author.bot) return
  const anything = new AnythingModel({
    anything: {
      content: message.content,
      author: {
        username: message.author.username,
        globalName: message.author.globalName,
        id: message.author.id
      },
    },
  });
  await anything.save();
});

client.on("interactionCreate", async (interation) => {
  if (!interation.isChatInputCommand()) return;
  try {
    if (interation.commandName === "quran") {
      const surah = interation.options.get("surah"),
        range = interation.options.get("range");
      const response = await getVerses(surah.value, range.value);
      const verses = Object.values(response);
      let fields = [];
      if (range.value.includes("-")) {
        verses.map((el) => {
          fields.push({
            name: el["content"].length > 252 ? el["content"].slice(0, 251) + "..." : el["content"].slice(0, 251) + "",
            value: el["translation_eng"].length > 1022 ? el["translation_eng"].slice(0, 1021) + "..." : el["translation_eng"].slice(0, 1021) + ""
          });
        });
        const embed = new EmbedBuilder()
          .setFields(...fields)
          .setTimestamp();
        interation.reply({ embeds: [embed] });
        fields = [];
        return
      } else {
        const embed = new EmbedBuilder()
          .setDescription(verses[1].length > 1042 ? verses[1].slice(0, 1041) + "..." : verses[1].slice(0, 1041))
          .setFooter({ text: verses[2].length > 2042 ? verses[2].slice(0, 2041) + "...": verses[2].slice(0, 2041)  })
          .setTimestamp();
        interation.reply({ embeds: [embed] });
        return
      }
    }
  } catch (error) {
    console.log(error)
    interation.reply(
      "```Please make sure you use the command currectly or the verses is not exist or there is to long verse use only one verse method and not range```"
    );
    return
  }
});

client.login(process.env.BOT_TOKEN);
keepAlive();
