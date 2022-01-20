module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Teams', {
		team_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		p1: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p1name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p2: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p2name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p3: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p3name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p4: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p4name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p5: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p5name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p6: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p6name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p7: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p7name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p8: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p8name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p9: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p9name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p10: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
		p10name: {
			type: DataTypes.STRING,
			defaultValue: 'NONE',
		},
	}, {
		tableName: 'teams',
		timestamps: false,
	});
};