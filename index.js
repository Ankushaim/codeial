const express = require('express');
const app = express();
const db = require('./config/mongoose');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const cookieParser = require('cookie-parser');


app.use(express.static('./assets'));

app.use(expressLayouts); 

//to access cookies in middleware
app.use(express.urlencoded());

app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

//use express router    
app.use('/', require('./routes/index'));

app.listen(port, function(error){
    if(error){
        console.log(`Error in Firing server on port ${port}`);
        return;
    }
    console.log(`Server is running successfully on port ${port}`);
})