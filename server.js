const express = require('express');                         
const app = express(); 
const bodyParser = require('body-parser');

app.use(express.static('public'))
app.use(bodyParser.json()) 

app.set('port', process.env.PORT || 3000);     


app.get('/', (request, response) => {
  app.use(express.static(path.join(__dirname, 'public')));
})            

app.listen(app.get('port'), () => {
  console.log(`Photo Trapper Keeper is running on ${app.get('port')}`)
})

