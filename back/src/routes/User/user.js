const UserController = require('../../controllers/User/UserController');
const isAuthenticated = require('../../policies/isAuthenticated');

module.exports = (app) => {
    app.get('/users', isAuthenticated, UserController.index);
    app.get('/users/:userId', isAuthenticated, UserController.getUser);
    app.post('/users', isAuthenticated, UserController.post);
    app.delete('/users/:userId', isAuthenticated, UserController.delete);
    app.put('/users/:userId', UserController.put);
    app.put('/users/:userId', UserController.put);
};
