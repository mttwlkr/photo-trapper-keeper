const express = require('express');                         
const app = express(); 
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];      
const database = require('knex')(configuration);  

app.use(express.static('public'))
app.use(bodyParser.json()) 

app.set('port', process.env.PORT || 3000);     


app.get('/', (request, response) => {
  app.use(express.static(path.join(__dirname, 'public')));
})

app.get('/api/v1/photos', (request, response) => {
  database('photos').select()                                  
    .then((photos) => {                                   
      response.status(200).json(photos);              
    })                
    .catch((error) => {                                             
      response.status(500).json(error);                         
    });
})

app.post('/api/v1/photos', (request, response) => {
  if (!request.body) {
    return response.status(422).send({Error: "Missing Information"})
  }
  database('photos').insert(request.body, ['title', 'url', 'id'])
    .then( photo => {
      console.log(photo)
      response.status(201).json({
        newPhoto: photo[0]
      })
    })
    .catch( error => {
      response.status(500).json({ error })
    })
})       

app.listen(app.get('port'), () => {
  console.log(`Photo Trapper Keeper is running on ${app.get('port')}`)
})

