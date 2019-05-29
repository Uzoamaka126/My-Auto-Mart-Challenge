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

describe('CAR ENDPOINTS', () => {
  it('should return a 201 status code and post a car', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('accept', 'application/json')
      .send(carDetails)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        done();
      });
  });

  it('should return a 200 status code and get a specific car', (done) => {
    chai.request(app)
      .get('/api/v1/car/1')
      .set('accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('/api/v1/car?status=available should respond with status code 200 and get a single car', (done) => {    // const status = available;
    chai.request(app)
      .get('/api/v1/car/?status=available')
      .set('Accept', 'application/json')
      // eslint-disable-next-line consistent-return
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('Status of the car has been retrieved successfully');
        done();
      });
  });

  // For deleting a selected car
  it('should return a 201 status code and delete the specific car', (done) => {
    chai.request(app)
      .delete('/api/v1/car/1')
      .set('accept', 'application/json')
      .send(carDetails)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.message).to.eql('ar has been deleted successfully');
        done();
      });
  });
  // The price of the car has been retrieved successfully
});
