import * as dotenv from 'dotenv';
import { SlashCommandBuilder, Routes, Client, GatewayIntentBits } from 'discord.js';
import { REST } from '@discordjs/rest';

dotenv.config();
const { token, clientId, guildId } = process.env;
console.log(process.env)

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);

const commands = [
	new SlashCommandBuilder().setName('hello').setDescription('Greet Horse Horse'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

	client.on('interactionCreate', async interaction => {
		if (!interaction.isChatInputCommand()) return;
	
		const { commandName } = interaction;
	
		if (commandName === 'hello') {
			await interaction.reply('Neigh, I am Horse Horse');
		}
	});
