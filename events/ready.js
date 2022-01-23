const Sequelize = require('sequelize');
const sequelize = require('../database/database.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);


		// const Users = require('../models/Users.js')(sequelize, Sequelize.DataTypes);
		// const Teams = require('../models/Teams.js')(sequelize, Sequelize.DataTypes);
		const EventWinPrediction = require('../models/EventWinPrediction.js')(sequelize, Sequelize.DataTypes);

		// Users.sync();
		// Teams.sync();
		EventWinPrediction.sync();
	},
};