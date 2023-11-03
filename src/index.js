require("dotenv").config();
const keepAlive = require("./server")
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const getVerses = require("../utils/getVerses");

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
            name: el["content"],
            value: el["translation_eng"].slice(0, 1021) + "...",
          });
        });
        const embed = new EmbedBuilder()
          .setTitle("Surah")
          .setDescription("Verses of the surah")
          .setFields(...fields)
          .setTimestamp();
        interation.reply({ embeds: [embed] });
        fields = [];
      } else {
        const embed = new EmbedBuilder()
          .setTitle("Surah")
          .setDescription("Verses of the surah")
          .setFields({ name: verses[1], value: verses[2].slice(0, 1021) })
          .setTimestamp();
        interation.reply({ embeds: [embed] });
      }
    }
  } catch(error) {
    interation.reply("```Please use the currect type of input surah number between 1 to 114 and range number with - and number example surah: 1 range: 1-7 or may the verses does not exist.```")
  }
});

client.login(process.env.BOT_TOKEN);
keepAlive();
