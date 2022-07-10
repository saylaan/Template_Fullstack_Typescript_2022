module.exports = (sequelize, DataTypes) => {
    const UserObject = sequelize.define('UserObject', {});

    UserObject.associate = function (models) {
        UserObject.belongsTo(models.User);
        UserObject.belongsTo(models.Object);
    };

    return UserObject;
};
