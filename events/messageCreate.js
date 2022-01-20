/* const Sequelize = require('sequelize');
const sequelize = require('../database/database.js');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		console.log(`${message.author.id} 테스트`);
		const Users = require('../models/Users.js')(sequelize, Sequelize.DataTypes);

		Users.create({
			user_id: message.author.id,
			win: 0,
			lose: 0,
		});

	},
}; */