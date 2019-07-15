/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
const { expect } = chai;

const carDetails = {
  id: 1,
  owner: 'amaka',
  created_on: 'Wed May 21-30-2019',
  state: 'New',
  status: 'sold',
  price: 40000,
  manufacturer: 'Toyota',
  model: 'D-200',
  body_type: 'streamlined',
};

const API_PREFIX = '/api/v1';

let verifyToken;

describe('CAR ENDPOINTS', () => {
  chai.request(app)
  .post('/api/v1/auth/signin')
  .set('accept', 'application/json')
  .send({
    email: 'amaka@gmail.com',
    password: 'userrt',
  })
  .end((err, res) => {
    if (err) done(err);
    verifyToken = res.body.data.token;
    done();
  })

  it('should return a 201 status code and create a new car', (done) => {
    chai.request(app)
      .post(`${API_PREFIX}/car`)
      .set('Accept', 'application/json')
      .send(carDetails)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Car has been created successfully');
        done();
      });
  });

  it('should return a 200 status code and get a specific car', () => {
    chai.request(app)
      .get(`${API_PREFIX}/car/1`)
      .set('accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Here is your car')
        done();
      });
  });

  it('/api/v1/car/1 should return a 403 status if user is not an admin', (done) => {
    const id = 2;
    chai.request(app)
      .delete(`${API_PREFIX}/${id}`)
      .set('x-access-token', verifyToken)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('Car has been deleted successfully');
        done();
      });
  });

  it('should return a 200 status code and get all cars', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('/api/v1/car?status=Available should respond with status code 200 and get the status of all the cars', (done) => {    // const status = available;
    const status = 'Available'
    chai.request(app)
      .get(`${API_PREFIX}/car/${status}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('The status and state of the car has been retrieved successfully');
        done();
      });
  });

  // For deleting a selected car
  it('/api/v1/car/1 should return a 201 status code and delete the specific car', (done) => {
    const id = 2;
    chai.request(app)
      .delete(`${API_PREFIX}/car/${id}`)
      .set('accept', 'application/json')
      .send(carDetails)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('Car has been deleted successfully');
        done();
      });
  });

  it('/api/v1/car?status=Available&state=Used should respond with status code 200 and get the status of all the new cars', (done) => {
    const status = 'Available';
    const state = 'Used';
    chai.request(app)
      .get(`${API_PREFIX}/car?status=${status}/state=${state}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('The status and state of the car has been retrieved successfully');
        done();
      });
  });

  it('/api/v1/car?status=Available&state=New should respond with status code 200 and get the status of all the used cars', (done) => {
    const status = 'Available';
    const state = 'New';
    chai.request(app)
    .get(`${API_PREFIX}/car?status=${status}/state=${state}`)
    .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('The status and state of the car has been retrieved successfully');
        done();
      });
  });

  it('api/v1/car?status=Available&manufacturer=Honda should respond with status code 200 and get the specified body type of all the cars', (done) => {
    chai.request(app)
    const manufacturer = 'Honda'
    const status = 'Available'
      .get(`${API_PREFIX}/car?status=${status}/manufacturer=${manufacturer}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('The status and state of the car has been retrieved successfully');
        done();
      });
  });

  it('api/v1/car?body_type= should respond with status code 200 and get the specified body type of all the cars', (done) => {
    const body_type = 'SUV';
    chai.request(app)
      .get(`${API_PREFIX}/car?body_type=${body_type}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('The specified body type of the car has been retrieved successfully');
        done();
      });
  });
});
