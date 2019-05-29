/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
const { expect } = chai;

const orderDetails = {
  id: 1,
  buyer: 'Uzoamaka Anyanwu',
  car_id: 28,
  created_on: '21-30-2019',
  status: 'pending',
  price: 4500000,
  price_offered: 3500000,
};

describe('Create an order', () => {
  it('/api/v1/order should return a 201 status code and create an order', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('accept', 'application/json')
      .send(orderDetails)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(201);
        expect(res.body.message).to.eql('Your order has been created successfully');
        done();
      });
  });

  it('/api/v1/order/:id should return a status code and retrieve a specific order', (done) => {
    const id = 209;
    chai.request(app)
      .get(`/api/v1/order/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('The order has been successfully retrieved');
        done();
      });
  });
});
