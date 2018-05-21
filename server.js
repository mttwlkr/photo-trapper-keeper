const express = require('express');                         
const app = express(); 
const bodyParser = require('body-parser');

app.use(bodyParser.json()) 

app.set('port', process.env.PORT || 3000);                 

app.listen(app.get('port'), () => {                                 // Direct the app to listen for, and then get what port the server is running on
  console.log(`Palette Picker is running on ${app.get('port')}`)    // log the app's title and the port it's running on
})

