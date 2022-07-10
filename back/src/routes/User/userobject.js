const UserObjectController = require('../../controllers/User/UserObjectController');
const isAuthenticated = require('../../policies/isAuthenticated');

module.exports = (app) => {
    app.get('/userobjects', isAuthenticated, UserObjectController.index);
    app.get('/userobjects/:userId', isAuthenticated, UserObjectController.getUserObjects);
    app.get('/objectusers/:objectId', isAuthenticated, UserObjectController.getObjectUsers);
    app.post('/userobject', isAuthenticated, UserObjectController.post);
    app.delete('/userobject/:userobjectId', isAuthenticated, UserObjectController.delete);
    app.put('/userobject/:userobjectId', isAuthenticated, UserObjectController.put);
};
