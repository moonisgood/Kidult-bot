const { MessageEmbed } = require('discord.js');
const Sequelize = require('sequelize');
const sequelize = require('../database/database.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('내전')
		.setDescription('내전에 대한 기본 명령어입니다.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('계정생성')
				.setDescription('계정을 생성합니다.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('명예의전당')
				.setDescription('TOP10 순위를 확인합니다.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('내정보')
				.setDescription('내정보를 확인합니다.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('검색')
				.setDescription('계정의 정보를 검색합니다.')
				.addUserOption(option => option.setName('대상').setDescription('대상의 아이디')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('순위')
				.setDescription('계정의 순위를 검색합니다.')
				.addUserOption(option => option.setName('대상').setDescription('대상의 아이디'))),
	async execute(interaction) {
		const Users = require('../models/Users.js')(sequelize, Sequelize.DataTypes);
		const embed = new MessageEmbed();

		if (interaction.options.getSubcommand() === '계정생성') {

			// 데이터가 있는지 체크한다.
			const user = await Users.findOne({ where: { user_id:interaction.member.id } });

			// 데이터가 없을 경우
			if (user === null) {
				await Users.create({
					user_id: `${interaction.member.id}`,
					user_name: `${interaction.member.displayName}`,
					win: 0,
					lose: 0,
					game: 0,
					winrate: 0,
				});
				let formatDisplayname = interaction.member.displayName;
				formatDisplayname = formatDisplayname.replace(/ /g, '');

				console.log(`${interaction.user.tag},${interaction.member.id}} - 신규 데이터 생성됨.`);
				embed
					.setColor('#0099ff')
					.setAuthor(`${interaction.member.displayName}`, `${interaction.user.displayAvatarURL()}`, `http://fow.kr/find/${formatDisplayname}`)
					.setTitle('계정이 생성되었습니다.');
			}
			// 데이터가 있을 경우
			else {
				let formatDisplayname = interaction.member.displayName;
				formatDisplayname = formatDisplayname.replace(/ /g, '');

				embed
					.setColor('#0099ff')
					.setAuthor(`${interaction.member.displayName}`, `${interaction.user.displayAvatarURL()}`, `http://fow.kr/find/${formatDisplayname}`)
					.setTitle('이미 계정이 존재합니다.');
			}
			await interaction.reply({ embeds: [embed] });
		}

		else if (interaction.options.getSubcommand() === '내정보') {
			let formatDisplayname = interaction.member.displayName;
			formatDisplayname = formatDisplayname.replace(/ /g, '');

			// 데이터가 있는지 체크한다.
			const user = await Users.findOne({ where: { user_id:interaction.member.id } });

			embed
				.setColor('#0099ff')
				.setAuthor(`${interaction.member.displayName}`, `${interaction.user.avatarURL()}`, `http://fow.kr/find/${formatDisplayname}`)
				.setTitle('어른이들 내전 전적')
				.setDescription((user.win + user.lose) + '전 ' + user.win + '승 ' + user.lose + '패 (' + user.winrate + '%)');

			await interaction.reply({ embeds: [embed] });
		}

		else if (interaction.options.getSubcommand() === '검색') {
			const targetMember = interaction.options.getMember('대상');
			// 데이터가 있는지 체크한다.
			const user = await Users.findOne({ where: { user_id:targetMember.id } });

			let formatDisplayname = targetMember.displayName;
			formatDisplayname = formatDisplayname.replace(/ /g, '');

			embed
				.setColor('#0099ff')
				.setAuthor(`${targetMember.displayName}`, `${targetMember.displayAvatarURL()}`, `http://fow.kr/find/${formatDisplayname}`)
				.setTitle('어른이들 내전 전적')
				.setDescription((user.win + user.lose) + '전 ' + user.win + '승 ' + user.lose + '패 (' + user.winrate + '%)');

			await interaction.reply({ embeds: [embed] });
		}
		else if (interaction.options.getSubcommand() === '순위') {
			const targetMember = interaction.options.getMember('대상');
			let formatDisplayname = targetMember.displayName;
			formatDisplayname = formatDisplayname.replace(/ /g, '');

			const users = await Users.findAll({
				where: {
					game: {
						[Sequelize.Op.gte]: 10,
					},
				},
				attributes: ['user_id', 'user_name', 'win', 'lose', 'game', 'winrate'],
				order: sequelize.literal('ROW_NUMBER() OVER (ORDER BY winrate DESC)'),
			});

			for (let i = 0; i < users.length; i++) {
				if (users[i].user_id === targetMember.id) {
					embed
						.setColor('#0099ff')
						.setAuthor(`${targetMember.displayName} 님의 내전 순위는 ${i + 1}위 입니다.`, `${targetMember.displayAvatarURL()}`, `http://fow.kr/find/${formatDisplayname}`);
					await interaction.reply({ embeds: [embed] });
					return;
				}
			}

			embed
				.setColor('#0099ff')
				.setAuthor(`${targetMember.displayName}`, `${targetMember.displayAvatarURL()}`, `http://fow.kr/find/${formatDisplayname}`)
				.setTitle('순위가 존재하지 않습니다.')
				.setDescription('10게임 이상 해야 순위가 갱신됩니다.');
			await interaction.reply({ embeds: [embed] });
		}

		else if (interaction.options.getSubcommand() === '명예의전당') {
			const users = await Users.findAll({
				where: {
					game: {
						[Sequelize.Op.gte]: 10,
					},
				},
				attributes: ['user_id', 'user_name', 'win', 'lose', 'game', 'winrate'],
				order: sequelize.literal('ROW_NUMBER() OVER (ORDER BY winrate DESC) LIMIT 10'),
			});

			let rankList = '';
			let str = '';

			for (let i = 0; i < users.length; i++) {
				rankList += i + 1 + '. ' + `[${users[i].user_name}](` + (users[i].win + users[i].game) + '전 ' + users[i].win + '승 ' + users[i].lose + '패)[' + users[i].winrate + '%]\n';
			}

			str = '```md\n' + '# 내전 순위 TOP 10\n' + rankList + '\n<10게임 이상 해야 갱신됩니다>```';
			await interaction.reply(str);
		}
	},
};