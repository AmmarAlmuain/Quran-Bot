require("dotenv").config();
const keepAlive = require("./server");
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const getVerses = require("../utils/getVerses");
const getGifs = require("../utils/getGifs");
const mongoose = require("mongoose");

const names = [
  "TheArkd",
  "Jack Napier",
  "Hell in Human Form",
  "Hawk",
  "deda",
  "Henry",
  "İlkay",
  "𝐋𝐚𝐮𝐫𝐢𝐞𝐫 𝐉𝐚𝐜𝐤",
  "beast_slayer_991",
  "Sequentia",
  "hiso",
  "Irfa._.Misashi",
  "Racooneom",
  "عُمَرْ",
  "K2",
  "𝐿𝓎𝓃𝓍",
  "sukun",
  "𝙏𝙞𝙜𝙚𝙧𝙨 𝙚𝙮𝙚",
  "Maryam",
];

const bycottCompanies = [
  "7up",
  "Acqua Panna",
  "Actimel",
  "Activia",
  "Adidas",
  "Aerin",
  "Aero",
  "Aesop",
  "Agoda",
  "Ahava",
  "Airbnb",
  "Airwaves",
  "Aldi Nord (not UK)",
  "Alpro",
  "Always",
  "Amazon",
  "Ambipur",
  "American Eagle",
  "Amika",
  "Appletiser",
  "Aptamil",
  "Aquafina",
  "Aquarius",
  "Aramis",
  "Ariel",
  "Arwa",
  "Aussie",
  "Aviva",
  "AXA",
  "Axe",
  "BAE Systems",
  "Bally",
  "Bank of America",
  "Bank of Montreal",
  "Barbican",
  "Barclays",
  "Bath & Body Works",
  "Bayer Pharmaceuticals",
  "Belvita",
  "Ben & Jerry's",
  "Ben's Originals",
  "Benefit Cosmetics",
  "BIOTHERM",
  "BNP Paribas",
  "Bobbi Brown",
  "Body Armor",
  "Boeing",
  "Bold",
  "Bomaja",
  "BP (British Petroleum)",
  "Booking.com",
  "Bounty",
  "Bounty Paper Towels",
  "Braun",
  "Bulgari / Bvlgari",
  "Burger King",
  "Buxton",
  "Cadbury",
  "Capital One",
  "Caribou Coffee",
  "Carmel Agrexco",
  "Carnation",
  "Carrefour",
  "Carte D'Or Ice Creams",
  "Caterpillar",
  "Catsan",
  "Celebrations",
  "Celine",
  "Cerave",
  "Chanel",
  "Charmin",
  "Cheapflights",
  "Cheerios",
  "Cheetos",
  "Cif",
  "Clear Blue",
  "Clinique",
  "Coca-Cola",
  "Coffee Mate",
  "Comfort",
  "Conservative party",
  "Cornetto Ice Creams",
  "Costa Coffee",
  "Coty",
  "Cow & Gate",
  "Crest Toothpaste",
  "Curver",
  "Daim",
  "Dairy Milk",
  "Danone",
  "Dasani Water",
  "Delilah",
  "Dell",
  "Desert Diamond",
  "Diesel Frangrances",
  "Diet Coke",
  "Dine",
  "Dior / Christian Dior",
  "Disney",
  "DKNY",
  "Dogadan",
  "Dolce Gusto",
  "Dolmio",
  "Domestos",
  "Doritos",
  "Dove",
  "Dr Pepper",
  "Eden Springs",
  "Elbit Systems",
  "Enjoy Life",
  "Espresso House",
  "Estee Lauder",
  "Evian",
  "Express VPN",
  "Fairlife",
  "Fairy",
  "Fanta",
  "Febreze",
  "Felix",
  "Fendi",
  "Fenty Beauty by Rihanna",
  "Fiverr",
  "Flash",
  "Fuzetea",
  "G4S",
  "Game Fuel",
  "Garnier",
  "Gatorade",
  "Gillette",
  "Giorgio Armani Beauty",
  "Givenchy",
  "Glaceau Smartwater",
  "Google",
  "Grenade",
  "Hadiklaim",
  "Halls",
  "Head and Shoulders",
  "Hellman's",
  "Herbal Essences",
  "Hotel Chocolat",
  "HP",
  "HSBC",
  "Hubba Bubba",
  "Hublot",
  "Hyundai",
  "IAMS",
  "Innocent Smoothies",
  "Intel",
  "IT Cosmetics",
  "Jaguar",
  "Jo Malone",
  "Jordan River",
  "Juicy Fruit",
  "Kayak",
  "Kenzo",
  "Kerastase",
  "Keter",
  "KFC",
  "Kiehl's",
  "Kilian",
  "King Solomon",
  "KitKat",
  "Knorr",
  "Krispy Kreme",
  "Kylie Cosmetics",
  "La Mer",
  "La Roche-Posay",
  "Lab Series",
  "Labour party",
  "Lancome",
  "Land Rover (Range Rover)",
  "Lavazza",
  "Lay's",
  "Legal & General",
  "Lenor",
  "Lidl",
  "Lion",
  "Lipton",
  "Lipton Iced Tea",
  "Lloyds Bank",
  "Lockheed Martin",
  "Loewe",
  "Loreal / L'oreal",
  "Louis Vuitton",
  "Lux",
  "LVMH",
  "Lynx",
  "M&M's",
  "MAC Cosmetics",
  "Magen David Adom",
  "Maggi",
  "Magnum Ice Creams",
  "Maison Francis Kurkdjian",
  "Maison Margiela Fragrances",
  "Malteasers",
  "Marc Jacobs",
  "Marks and Spencer / M&S",
  "Mars",
  "Maybelline",
  "MBDA",
  "McDonalds",
  "Mercedes Benz",
  "Microsoft",
  "Mikado",
  "Milka",
  "Milky Way",
  "Milkybar",
  "Minute Maid",
  "Monday.com",
  "Mondelez",
  "Monster Energy",
  "Moovit",
  "MoroccanOil",
  "Motorola",
  "Mountain Dew",
  "Movenpick",
  "Mugler Beauty",
  "Naked Juice",
  "Nescafe",
  "Nespresso",
  "Nesquik",
  "Nestle",
  "NIOD",
  "Nvidia",
  "NYX Professional Makeup",
  "Oasis",
  "Olay",
  "Old Spice",
  "OpenAI",
  "Opentable",
  "Oracle",
  "Oral B",
  "Orangina",
  "Oreo",
  "Origins",
  "Outbrain",
  "Pampers",
  "Pantene",
  "Payoneer",
  "Pedigree",
  "Peet's Coffee",
  "Pepsi",
  "Perrier",
  "Persil",
  "Philadelphia",
  "Pizza Hut",
  "Popeyes",
  "Power Action",
  "Powerade",
  "Prada Beauty",
];

try {
  mongoose.connect(process.env.DB_CONNECTION_URI);
  console.log("Database is connected!");
} catch (error) {
  console.log(error);
}

const Schema = mongoose.Schema;

const anythingSchema = new Schema(
  {
    anything: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const AnythingModel = mongoose.model("Anything", anythingSchema);

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", async (client) => {
  console.log(`${client.user.username} is ready!`);
  // const guild = client.guilds.cache.get("");
  // guild.members.fetch().then((members) => {
  //   // Loop through each member
  //   members.forEach((member) => {
  //     // Log the username of each member
  //     console.log(member.user.globalName);
  //   });
  // });
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.includes("-boycott")) {
    let company = message.content.split(" ")[1];
    company = company.toLowerCase();
    for (var i = 0; i < bycottCompanies.length; i++) {
      var element = bycottCompanies[i].toLowerCase();
      if (element === company) {
        message.reply(
          "Match found: " + element + " you should boycott this company!"
        );
        return;
      }
    }
    message.reply("This might not a company or its safe one!");
  }
  if (message.content == "-hiq") {
    message.reply(
      `${
        names[Math.floor(Math.random() * names.length)]
      } is the smartest in here!`
    );
    return;
  }
  if (message.content == "-liq") {
    message.reply(
      `${
        names[Math.floor(Math.random() * names.length)]
      } is the dumbest in here!`
    );
    return;
  }
  if (message.content == "-tm") {
    const countDocuments = await AnythingModel.countDocuments();
    message.reply(
      "```The total messages i have recognized is " + countDocuments + "```"
    );
    return;
  }
  if (message.content == "-mm") {
    const myMessages = await AnythingModel.countDocuments({
      "anything.author.id": message.author.id,
    });
    message.reply(
      "```" +
        message.author.globalName +
        " have sent " +
        myMessages +
        " messages good job" +
        "```"
    );
    return;
  }
  if (message.content == "-rm") {
    const topThree = await AnythingModel.aggregate([
      {
        $group: {
          _id: "$anything.author.id",
          globalName: { $first: "$anything.author.globalName" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);

    let reply = "```";
    for (let i = 0; i < topThree.length; i++) {
      reply +=
        "(" +
        topThree[i].globalName +
        ") has sent " +
        topThree[i].count +
        " messages.\n";
    }
    reply += "```";

    message.reply(reply);
    return;
  }
  const anything = new AnythingModel({
    anything: {
      content: message.content,
      author: {
        username: message.author.username,
        globalName: message.author.globalName,
        id: message.author.id,
      },
    },
  });
  await anything.save();
});

client.on("interactionCreate", async (interation) => {
  if (!interation.isChatInputCommand()) return;
  if (interation.commandName === "anime_gif") {
    reaction = interation.options.get("reaction");
    interation.reply(await getGifs(reaction.value));
    return;
  }
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
            name:
              el["content"].length > 252
                ? el["content"].slice(0, 251) + "..."
                : el["content"].slice(0, 251) + "",
            value:
              el["translation_eng"].length > 1022
                ? el["translation_eng"].slice(0, 1021) + "..."
                : el["translation_eng"].slice(0, 1021) + "",
          });
        });
        const embed = new EmbedBuilder().setFields(...fields).setTimestamp();
        interation.reply({ embeds: [embed] });
        fields = [];
        return;
      } else {
        const embed = new EmbedBuilder()
          .setDescription(
            verses[1].length > 1042
              ? verses[1].slice(0, 1041) + "..."
              : verses[1].slice(0, 1041)
          )
          .setFooter({
            text:
              verses[2].length > 2042
                ? verses[2].slice(0, 2041) + "..."
                : verses[2].slice(0, 2041),
          })
          .setTimestamp();
        interation.reply({ embeds: [embed] });
        return;
      }
    }
  } catch (error) {
    console.log(error);
    interation.reply(
      "```Please make sure you use the command currectly or the verses is not exist or there is to long verse use only one verse method and not range```"
    );
    return;
  }
});

client.login(process.env.BOT_TOKEN);
keepAlive();
