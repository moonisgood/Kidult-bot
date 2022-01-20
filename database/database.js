const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
	host: 'uzb4o9e2oe257glt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	dialect: 'mysql',
	timezone: '+09:00',
	logging: false,
});