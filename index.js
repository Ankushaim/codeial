const express = require('express');
const app = express();
const db = require('./config/mongoose');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const cookieParser = require('cookie-parser');

//Used for session cookie and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 

const MongoStore = require('connect-mongo')(session);


app.use(express.static('./assets'));

app.use(expressLayouts); 

//to access cookies in middleware
app.use(express.urlencoded());

app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store session cookie in the db
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled',
    },
    function(err){
        console.log(err || 'connect mongo db setup ok');
    }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



//use express router    
app.use('/', require('./routes/index'));

app.listen(port, function(error){
    if(error){
        console.log(`Error in Firing server on port ${port}`);
        return;
    }
    console.log(`Server is running successfully on port ${port}`);
})