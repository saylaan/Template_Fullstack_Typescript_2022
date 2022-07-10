module.exports = (sequelize, DataTypes) => {
    const Object = sequelize.define('Object', {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    return Object;
};
