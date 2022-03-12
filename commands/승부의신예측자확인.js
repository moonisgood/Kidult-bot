const { MessageEmbed } = require('discord.js');
const Sequelize = require('sequelize');
const sequelize = require('../database/database.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('승부의신예측자확인')
		.setDefaultPermission(false)
		.setDescription('승부의신 이벤트 관리자 명령어'),
	async execute(interaction) {
		const EventWinPrediction = require('../models/EventWinPrediction.js')(sequelize, Sequelize.DataTypes);
		const embed = new MessageEmbed();
		let str = '';

		await interaction.reply('예측자를 찾는 중입니다...');

		// DB 데이터가 있는지 체크한다.
		const users = await EventWinPrediction.findAll({ where: { win1:5, win2:1, win3:2, win4:3, win5:4 } });

		// DB 데이터가 없을 경우
		if (users.length === 0) {
			embed
				.setColor('#0099ff')
				.setTitle('💥 승부의 신 예측자 💥')
				.setDescription('예측에 성공한 사람이 없습니다..');
		}
		// DB 데이터가 있을 경우
		else {
			for (let i = 0; i < users.length; i++) {
				str += `${users[i].user_name} `;
			}

			embed
				.setColor('#0099ff')
				.setTitle('💥 승부의 신 예측자 💥')
				.setDescription(str);
		}

		await interaction.followUp({ embeds: [embed] });
	},
};