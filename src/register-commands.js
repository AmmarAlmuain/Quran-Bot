require("dotenv").config();
const {
  REST,
  Routes,
  Application,
  ApplicationCommandOptionType,
} = require("discord.js");

const commands = [
  {
    name: "quran",
    description: "Return verses from quran.",
    options: [
      {
        name: "surah",
        description: "Number between 1 to 114.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "range",
        description: "Number of verses you want from the surah.",
        type: ApplicationCommandOptionType.String,
        required: true
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

(async () => {
  console.log("Registering slash command...");

  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Registered.");
  } catch (error) {
    console.log(error);
  }
})();
