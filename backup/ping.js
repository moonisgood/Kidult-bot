const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDefaultPermission(false)
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('테스트');
	},
};
