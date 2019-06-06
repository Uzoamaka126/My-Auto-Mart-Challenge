/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

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

const updatedOrder = {
  price_offered: 3500000,
};

const userDetails = {
  id: 1,
  email: "amaka@gmail.com",
  first_name: "Uzoamaka",
  last_name: "Anyanwu",
  password: "admin",
  address: "12, Gbagada Phase 1",
};

describe('Create an order', () => {
  it('/api/v1/order should return a 201 status code and create an order', (done) => {
    chai.request(server)
      .post('/api/v1/order')
      .set('accept', 'application/json')
      .send(orderDetails)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Your order has been created successfully');
        done();
      });
  });

  it('/api/v1/order/:id should return a status code and retrieve a specific order', (done) => {
    const id = 1;
    chai.request(server)
      .get(`/api/v1/order/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('The order has been successfully retrieved');
        done();
      })
  });

  it('/api/v1/order/:id should respond with status code 201 and update the order', (done) => {
    chai.request(server)
      .patch(`/api/v1/order/1`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('The order has been updated successfully');
        done();
      });
  });

  it('/api/v1/order/:id/price should respond with status code 404 and and show order not found', (done) => {
    const id = 2;
    chai.request(server)
      .patch(`/api/v1/order/${id}/price`)
      .send({
        new_price_offered: 50000000,
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        done();
      });
  });
});
