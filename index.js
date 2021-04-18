const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(expressLayouts);

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