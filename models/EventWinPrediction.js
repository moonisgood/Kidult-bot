module.exports = (sequelize, DataTypes) => {
	return sequelize.define('EventWinPrediction', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		user_name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		win1: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		win2: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		win3: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		win4: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		win5: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		tableName: 'EventWinPrediction',
		timestamps: true,
	});
};