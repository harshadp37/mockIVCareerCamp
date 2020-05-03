const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;

const morgan = require('morgan');
const path = require('path');
const db = require('./config/db');
const sessionConfig = require('./config/session');
require('./config/passport');

const app = express();

// MONGODB CONNECTION
mongoose.connect(db.URL + db.databaseName, db.options, (err)=>{
    if(err) throw err;
    console.log("Connected to MongoDB : " + db.databaseName);
})

// VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// EXPRESS-LAYOUTS MIDDLEWARES
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'assests')));

// MONGODB TO STORE SESSION
app.use(new session({
    secret: sessionConfig.secret,
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: sessionConfig.maxAge},
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

// PASSPORT SETUP
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setEmployee);

// INDEX ROUTE
app.use('/', require('./routes/index'));

// START SERVER
app.listen(PORT, ()=>{
    console.log("Server Running on PORT : " + PORT);
})