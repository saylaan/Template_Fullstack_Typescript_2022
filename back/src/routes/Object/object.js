const ObjectController = require('../../controllers/Object/ObjectController');
const isAuthenticated = require('../../policies/isAuthenticated');

module.exports = (app) => {
    app.get('/objects', isAuthenticated, ObjectController.index);
    app.get('/objects/:objectId', isAuthenticated, ObjectController.getObject);
    app.post('/objects', isAuthenticated, ObjectController.post);
    app.delete('/objects/:objectId', isAuthenticated, ObjectController.delete);
    app.put('/objects/:objectId', ObjectController.put);
    app.put('/objects/:objectId', ObjectController.put);
};
