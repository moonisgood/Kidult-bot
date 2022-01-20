const { MessageEmbed } = require('discord.js');
const Sequelize = require('sequelize');
const sequelize = require('../database/database.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('내전관리')
		.setDefaultPermission(false)
		.setDescription('내전에 대한 관리 명령어입니다.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('승리')
				.setDescription('1팀, 2팀 선택'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('계정생성')
				.setDescription('해당 유저의 계정을 생성합니다.')
				.addUserOption(option => option.setName('대상').setDescription('대상의 아이디')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('팀생성')
				.setDescription('팀을 생성합니다. 1~5(1팀), 6~10(2팀)')
				.addNumberOption(option => option.setName('번호').setDescription('팀을 저장할 번호'))
				.addUserOption(option => option.setName('대상1').setDescription('대상의 아이디'))
				.addUserOption(option => option.setName('대상2').setDescription('대상의 아이디'))
				.addUserOption(option => option.setName('대상3').setDescription('대상의 아이디'))
				.addUserOption(option => option.setName('대상4').setDescription('대상의 아이디'))
				.addUserOption(option => option.setName('대상5').setDescription('대상의 아이디'))
				.addUserOption(option => option.setName('대상6').setDescription('대상의 아이디'))
				.addUserOption(option => option.setName('대상7').setDescription('대상의 아이디'))
				.addUserOption(option => option.setName('대상8').setDescription('대상의 아이디'))
				.addUserOption(option => option.setName('대상9').setDescription('대상의 아이디'))
				.addUserOption(option => option.setName('대상10').setDescription('대상의 아이디')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('결과')
				.setDescription('내전 승리,패배 처리를 합니다.')
				.addNumberOption(option => option.setName('번호').setDescription('팀이 저장된 번호'))
				.addNumberOption(option => option.setName('승리팀 번호').setDescription('승리한 팀 1~2 선택')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('승')
				.setDescription('해당 유저를 승 처리합니다.')
				.addUserOption(option => option.setName('대상').setDescription('대상의 아이디')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('패')
				.setDescription('해당 유저를 패 처리합니다.')
				.addUserOption(option => option.setName('대상').setDescription('대상의 아이디'))),
	async execute(interaction) {
		const Users = require('../models/Users.js')(sequelize, Sequelize.DataTypes);
		const Teams = require('../models/Teams.js')(sequelize, Sequelize.DataTypes);
		const embed = new MessageEmbed();

		// 계정생성
		if (interaction.options.getSubcommand() === '계정생성') {
			const targetMember = interaction.options.getMember('대상');
			// 데이터가 있는지 체크한다.
			const user = await Users.findOne({ where: { user_id:targetMember.id } });

			// 데이터가 없을 경우
			if (user === null) {
				await Users.create({
					user_id: `${targetMember.id}`,
					user_name: `${targetMember.displayName}`,
					win: 0,
					lose: 0,
					game: 0,
					winrate: 0,
				});
				let formatDisplayname = targetMember.displayName;
				formatDisplayname = formatDisplayname.replace(/ /g, '');

				console.log(`${targetMember.user.tag},${targetMember.id}} - 신규 데이터 생성됨.`);
				embed
					.setColor('#0099ff')
					.setAuthor(`${targetMember.displayName}`, `${targetMember.displayAvatarURL()}`, `http://fow.kr/find/${formatDisplayname}`)
					.setTitle('계정이 생성되었습니다.');
			}
			// 데이터가 있을 경우
			else {
				let formatDisplayname = targetMember.displayName;
				formatDisplayname = formatDisplayname.replace(/ /g, '');

				embed
					.setColor('#0099ff')
					.setAuthor(`${targetMember.displayName}`, `${targetMember.displayAvatarURL()}`, `http://fow.kr/find/${formatDisplayname}`)
					.setTitle('이미 계정이 존재합니다.');
			}
			await interaction.reply({ embeds: [embed] });
		}

		// 팀생성
		else if (interaction.options.getSubcommand() === '팀생성') {
			await interaction.reply('팀을 생성중입니다...');
			const number = interaction.options.getNumber('번호');
			const players = [];
			const playersInfo = [];
			for (let i = 1 ; i < 11 ;i++) {
				players.push(interaction.options.getMember(`대상${i}`));
			}

			if (number === null) {
				await interaction.editReply('팀을 생성하는데 실패했습니다.');
				return;
			}
			// 데이터가 있는지 체크한다.
			const team = await Teams.findOne({ where: { team_id:number } });

			// INSERT Teams 테이블 데이터
			if (team === null) {
				await Teams.create({
					team_id: `${number}`,
					p1: `${players[0].id}`,
					p1name: `${players[0].displayName}`,
					p2: `${players[1].id}`,
					p2name: `${players[1].displayName}`,
					p3: `${players[2].id}`,
					p3name: `${players[2].displayName}`,
					p4: `${players[3].id}`,
					p4name: `${players[3].displayName}`,
					p5: `${players[4].id}`,
					p5name: `${players[4].displayName}`,
					p6: `${players[5].id}`,
					p6name: `${players[5].displayName}`,
					p7: `${players[6].id}`,
					p7name: `${players[6].displayName}`,
					p8: `${players[7].id}`,
					p8name: `${players[7].displayName}`,
					p9: `${players[8].id}`,
					p9name: `${players[8].displayName}`,
					p10: `${players[9].id}`,
					p10name: `${players[9].displayName}`,
				});
			}

			for (let i = 0; i < 10; i++) {
				if (players[i] === null) {
					await interaction.editReply('팀을 생성하는데 실패했습니다.');
					return;
				}

				playersInfo.push(await Users.findOne({ where: { user_id: players[i].id } }));
			}

			let ateam = '';
			let apower = 0;
			let bteam = '';
			let bpower = 0;

			for (let i = 0; i < 5; i++) {
				ateam += '[' + playersInfo[i].user_name + '] ' + `${playersInfo[i].win}W ${playersInfo[i].lose}L ${playersInfo[i].winrate}%` + '\n';
				apower += playersInfo[i].winrate;
			}
			for (let i = 5; i < 10; i++) {
				bteam += '[' + playersInfo[i].user_name + '] ' + `${playersInfo[i].win}W ${playersInfo[i].lose}L ${playersInfo[i].winrate}%` + '\n';
				bpower += playersInfo[i].winrate;
			}

			embed
				.setColor('#0099ff')
				.setTitle('############## 내전 ##############')
				.addFields(
					{ name: ':blue_square: 1팀\u200B', value: `${ateam}:fire:  ${apower}`, inline: true },
					{ name: ':red_square: 2팀\u200B', value: `${bteam}:fire:  ${bpower}`, inline: true },
				);

			await interaction.followUp({ embeds: [embed] });
		}

		// 결과
		else if (interaction.options.getSubcommand() === '결과') {
			await interaction.reply('결과를 처리중입니다...');
		}

		// 결과
		else if (interaction.options.getSubcommand() === '승') {
			const targetMember = interaction.options.getMember('대상');

			// 데이터가 있는지 체크한다.
			const user = await Users.findOne({ where: { user_id:targetMember.id } });

			if (user === null) {
				await interaction.reply('해당 플레이어의 데이터가 존재하지 않습니다.');
				return;
			}

			embed
				.setColor('#0099ff')
				.setTitle('전적 갱신')
				.addFields(
					{ name: `${user.user_name}`, value: `${user.win}W ${user.lose}L ${user.winrate}%`, inline: true },
					{ name: `${user.user_name}`, value: `${user.win + 1}W ${user.lose}L ${user.winrate}%`, inline: true },
				);
		}

		// 결과
		else if (interaction.options.getSubcommand() === '패') {
			const targetMember = interaction.options.getMember('대상');

			// 데이터가 있는지 체크한다.
			const user = await Users.findOne({ where: { user_id:targetMember.id } });

			if (user === null) {
				await interaction.editReply('해당 플레이어의 데이터가 존재하지 않습니다.');
				return;
			}
		}
	},
};