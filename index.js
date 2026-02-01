const { Client, GatewayIntentBits, SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// BASIC SLASH COMMAND (TEST)
const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if the bot is online")
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log("Slash commands registered.");
  } catch (error) {
    console.error(error);
  }
})();

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🟢 Creekside Bot is online.");
  }
});

client.login(TOKEN);
