import { Client, GatewayIntentBits } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.on('ready', () => {
  console.log(`🤖 Bot connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().startsWith('!promptbrainrot')) {
    try {
      await axios.post(process.env.WEBHOOK_URL, {
        username: message.author.username,
        content: message.content,
        channel: message.channel.name,
        user_id: message.author.id,
      });
      console.log('✅ Message envoyé à n8n :', message.content);
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi au webhook n8n:', error.message);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
