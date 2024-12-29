const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session'); 
const flash = require('connect-flash');
const PORT = 4000;


//Database connection
mongoose.connect('mongodb+srv://admin:adminWEB10@cluster0.3obax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true
})

global.loggedIn = null;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());
app.use(expressSession({
    secret:"node secret"
}));

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});
app.set('view engine', 'ejs');

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


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

module.exports = app;


