const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/', require('./routes/index'));

app.listen(port, function(error){
    if(error){
        console.log(`Error in Firing server on port ${port}`);
        return;
    }
    console.log(`Server is running successfully on port ${port}`);
})