const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session'); 
const flash = require('connect-flash');
const PORT = 4000;
const serverless = require('serverless-http');


//Database connection
mongoose.connect('mongodb+srv://admin:adminWEB10@cluster0.3obax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

global.loggedIn = null;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(expressSession({ 
    secret: 'secret', 
    resave: false, 
    saveUninitialized: false 
}));
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

//Set views
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.set('controllers', path.resolve(__dirname, 'controllers'));
app.set('middleware', path.resolve(__dirname, 'middleware'));
app.set('public', path.resolve(__dirname, 'public'));
app.set('models', path.resolve(__dirname, 'models'));


//Controllers
const indexController = require('./controllers/indexController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const storeUserController = require('./controllers/storeUserController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController');
const homeController = require('./controllers/homeController');

//Middleware
const redirectIfAuth = require('./middleware/redirectifAuth');
const authMiddleware = require('./middleware/authMiddleware');

//Routes
app.get('/', indexController);
app.get('/login', redirectIfAuth, loginController);
app.get('/register', redirectIfAuth, registerController);
app.post('/user/register', redirectIfAuth, storeUserController);
app.post('/user/login', redirectIfAuth, loginUserController);
app.get('/logout', logoutController);
app.get('/home', authMiddleware, homeController);


// app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
// });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// module.exports = (req, res) => {
//     app(req, res);
// };


module.exports = serverless(app);
