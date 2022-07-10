const { sequelize, User, Object, UserObject } = require('../src/models');

const Promise = require('bluebird');

const users = require('./User/users.json');
const userobjects = require('./User/userobjects.json');

const objects = require('./Object/objects.json');

sequelize.sync({ force: true }).then(async function () {
    /* ####################################################################### */
    /* USER */
    await Promise.all(
        users.map((user) => {
            User.create(user);
        })
    );
    /* OBJECT */
    await Promise.all(
        objects.map((object) => {
            Object.create(object);
        })
    );
    /* USEROBJECT */
    await Promise.all(
        userobjects.map((userobject) => {
            UserObject.create(userobject);
        })
    );
});
