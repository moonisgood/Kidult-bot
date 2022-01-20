const Sequelize = require('sequelize');
const sequelize = require('../database/database.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		// 920992067172327485 내전관리
		const fullPermissions = [
			{
				id: '933778049281970246',
				permissions: [{
					id: '250664648066596864',
					type: 'USER',
					permission: true,
				}],
			},
		];
		await client.guilds.cache.get('917847857791381544')?.commands.permissions.set({ fullPermissions });

		// const Users = require('../models/Users.js')(sequelize, Sequelize.DataTypes);
		// const Teams = require('../models/Teams.js')(sequelize, Sequelize.DataTypes);
		const EventWinPrediction = require('../models/EventWinPrediction.js')(sequelize, Sequelize.DataTypes);

		// Users.sync();
		// Teams.sync();
		EventWinPrediction.sync();
	},
};