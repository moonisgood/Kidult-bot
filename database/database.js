const Sequelize = require('sequelize');
const { db_database, db_user, db_password } = require('../config.js');

module.exports = new Sequelize(db_database, db_user, db_password, {
	host: 'uzb4o9e2oe257glt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	dialect: 'mysql',
	timezone: '+09:00',
	logging: false,
});