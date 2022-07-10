const AuthenController = require('../../controllers/Authen/AuthenController');
const AuthenControllerPolicy = require('../../policies/AuthenControllerPolicy');

module.exports = (app) => {
    /* get / post / put / patch / delete */ // this for making the controller of data through the routes
    // app.get('/status', (req, res) => { // Just a testing method for see if back-end works well
    //   res.send({
    //     message: 'Hello my name is status'
    //   })
    // })
    app.post('/register', AuthenControllerPolicy.register, AuthenController.register);
    app.post('/signin', AuthenController.signin);
};
