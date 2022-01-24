const { MessageEmbed } = require('discord.js');
const Sequelize = require('sequelize');
const sequelize = require('../database/database.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('승부의신')
		.setDescription('승부의신 이벤트 명령어')
		.addSubcommand(subcommand =>
			subcommand
				.setName('정보')
				.setDescription('이벤트에 대한 정보를 확인합니다.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('보기')
				.setDescription('자신이 예측한 팀을 확인합니다.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('참가')
				.setDescription('승부의신 이벤트에 참가합니다.')
				.addIntegerOption(option => option.setName('1등팀').setDescription('팀번호'))
				.addIntegerOption(option => option.setName('2등팀').setDescription('팀번호'))
				.addIntegerOption(option => option.setName('3등팀').setDescription('팀번호'))
				.addIntegerOption(option => option.setName('4등팀').setDescription('팀번호'))
				.addIntegerOption(option => option.setName('5등팀').setDescription('팀번호'))),
	async execute(interaction) {
		const teamName = [ 0, '인생은 기도메타', '인생눈이흐릿해', '해치웠나', '커피뽑는공룡', '자로튀김' ];
		const whoIsIn1 = [ '말캉말캉 슬라임', '달연오(요댕)', 'Gido', '천향초', '한큐인생' ];
		const EventWinPrediction = require('../models/EventWinPrediction.js')(sequelize, Sequelize.DataTypes);
		const embed = new MessageEmbed();

		if (interaction.options.getSubcommand() === '정보') {

			embed
				.setColor('#0099ff')
				.setTitle('💥 승부의 신 💥')
				.setDescription(`1️⃣팀: ${teamName[1]} - ${whoIsIn1}\n2️⃣팀: ${teamName[2]}\n3팀: ${teamName[3]}\n4팀: ${teamName[4]}\n5팀: ${teamName[5]}\n――――――――――――――――――――\n승리 팀을 예측해보세요!\n/승부의신 참가 1등팀번호 2등팀번호 3등팀번호 4등팀번호 5등팀번호\n입력하실 때 TAP키를 이용해주세요. 도움이 필요하면 '떼윤'에게 문의`);

			await interaction.reply({ embeds: [embed] });
		}

		else if (interaction.options.getSubcommand() === '보기') {
			// DB 데이터가 있는지 체크한다.
			const WinPrediction = await EventWinPrediction.findOne({ where: { user_id:interaction.member.id } });

			// DB 데이터가 없을 경우
			if (WinPrediction === null) {
				embed
					.setColor('#0099ff')
					.setTitle('💥 승부의 신 💥')
					.setDescription(`${interaction.member.displayName} 님은 아직 예측하지 않으셨습니다.`);
			}
			// DB 데이터가 있을 경우
			else {
				embed
					.setColor('#0099ff')
					.setTitle('💥 승부의 신 💥')
					.setDescription(`${interaction.member.displayName} 님이 예측하신 팀 \n――――――――――――――――――――\n1등: ${teamName[WinPrediction.win1]}\n2등: ${teamName[WinPrediction.win2]}\n3등: ${teamName[WinPrediction.win3]}\n4등: ${teamName[WinPrediction.win4]}\n5등: ${teamName[WinPrediction.win5]}`);
			}

			await interaction.reply({ embeds: [embed] });
		}

		else if (interaction.options.getSubcommand() === '참가') {
			const teamNumber = [];
			const teamList = [];

			for (let i = 0; i < 5; i++) {
				teamNumber.push(interaction.options.getInteger(`${i + 1}등팀`));
				teamList.push(teamName[interaction.options.getInteger(`${i + 1}등팀`)]);
			}

			// DB 데이터가 있는지 체크한다.
			const WinPrediction = await EventWinPrediction.findOne({ where: { user_id:interaction.member.id } });

			// DB 데이터가 없을 경우
			if (WinPrediction === null) {
				await EventWinPrediction.create({
					user_id: `${interaction.member.id}`,
					user_name: `${interaction.member.displayName}`,
					win1: teamNumber[0],
					win2: teamNumber[1],
					win3: teamNumber[2],
					win4: teamNumber[3],
					win5: teamNumber[4],
				});

				embed
					.setColor('#0099ff')
					.setTitle('💥 승부의 신 💥')
					.setDescription(`${interaction.member.displayName} 님이 예측하셨습니다!\n――――――――――――――――――――\n1등: ${teamList[0]}\n2등: ${teamList[1]}\n3등: ${teamList[2]}\n4등: ${teamList[3]}\n5등: ${teamList[4]}`);
			}
			// DB 데이터가 있을 경우
			else {
				embed
					.setColor('#0099ff')
					.setTitle('💥 승부의 신 💥')
					.setDescription(`${interaction.member.displayName} 님은 이미 예측하셨습니다!\n――――――――――――――――――――\n1등: ${teamName[WinPrediction.win1]}\n2등: ${teamName[WinPrediction.win2]}\n3등: ${teamName[WinPrediction.win3]}\n4등: ${teamName[WinPrediction.win4]}\n5등: ${teamName[WinPrediction.win5]}`);

			}

			await interaction.reply({ embeds: [embed] });
		}
	},
};