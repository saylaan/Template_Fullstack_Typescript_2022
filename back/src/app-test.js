/* Import package */
const imports = require('./config/imports'); // all import for the app
const { sequelize } = require('./models'); // models folder with index.js file who return a sequelize obj

console.log(`Server working... ${imports.config.portHttp}`);
/* build an express app */
const app = imports.express(); //link express to app

/* enable packages */
app.use(imports.morgan('combined')); // morgan doc -> print out log;
app.use(imports.bodyParser.json()); // node middleware for handling encoded form data
app.use(imports.cors()); // server hosted on different depend --> CARE (need good security)

require('./policies/passport'); // this is for passport authen
require('./routes')(app); // attach all the different endpoint to the apps
app.set('trust proxy', true); // resolution of ip problem

/* Setting up socket */
const server = require('http').createServer(app);
const io = imports.socketio(server, {
    cors: {
        origin: '*' // Being able to use socketio on all host
    }
});
require('./socket/socket-service')(io);

sequelize.sync(); // sync sequelize with the server {force : true} = deleting all data

module.exports = app.listen(imports.config.portHttp);
