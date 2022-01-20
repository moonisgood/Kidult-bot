module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		user_name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		win: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		lose: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		game: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		winrate: {
			type: DataTypes.FLOAT,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		tableName: 'users',
		timestamps: false,
	});
};