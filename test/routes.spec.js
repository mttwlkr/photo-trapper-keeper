const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server.js');

chai.use(chaiHttp);

describe('Testing endpoints', () => {
  
  beforeEach(done => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        database.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  describe('GET', () => {
    
    it('should get all the photos', (done) => {
      chai.request(app)
      .get('/api/v1/photos')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body[0].should.have.property('id')
        res.body[0].id.should.equal(1)
        res.body[0].should.have.property('title')
        res.body[0].title.should.equal('corgi')
        res.body[0].should.have.property('url')
        res.body[0].url.should.equal('https://i.imgur.com/MA2D0.jpg')
      done()
      })
    })

    it('should throw a 404 error if the url is wrong', (done) => {
      chai.request(app)
      .get('/api/v1/photttooo')
      .end((err, res) => {
        res.should.have.status(404);
      done();
      })
    })
  })

  describe('POST', () => {
    it('should post a new photo', (done) => {
      chai.request(app)
      .post('/api/v1/photos').send({ 
        title: "husky", 
        url: "http://f9vision.com/wp-content/uploads/2015/10/BW-GSD-2.jpg.pagespeed.ce.oLLIekuUYc.jpg" 
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.newPhoto.should.have.property('id')
        res.body.newPhoto.id.should.equal(2)
        res.body.newPhoto.should.have.property('title')
        res.body.newPhoto.title.should.equal('husky')
        res.body.newPhoto.should.have.property('url')
        res.body.newPhoto.url.should.equal('http://f9vision.com/wp-content/uploads/2015/10/BW-GSD-2.jpg.pagespeed.ce.oLLIekuUYc.jpg')
      done();
      })
    })

    it('should not post if the url is not present', (done) => {
      chai.request(app)
      .post('/api/v1/photos').send({ 
        lol: "wat" 
      })
      .end((err, res) => {
        res.should.have.status(422)
        res.should.be.json;
        res.body.should.deep.equal({ Error: 'Missing Information' })
      done();
      })   
    })
  })

  describe('DELETE', () => {
    it('should delete a photo', (done) => {
      chai.request(app)
      .del('/api/v1/photos').send({
        id: "1"
      })
      .end((err, res) => {
        res.should.have.status(202);
      done();
      })
    })

    it('should not delete a photo if the ID does not exist', (done) => {
      chai.request(app)
      .del('/api/v1/photos')
      .end((err, res) => {
        res.should.have.status(500);
      done();
      })
    })
  })
})