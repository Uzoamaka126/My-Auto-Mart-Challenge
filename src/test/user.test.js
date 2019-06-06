import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../server';


chai.use(chaiHTTP);
const { expect } = chai;

const userDetails = {
  id: 100,
  email: 'amaka@gmail.com',
  first_name: 'Uzoamaka',
  last_name: 'Peter',
  password: 'admin',
  address: '12 Gbagada'
};

describe('Sign up test for the User', () => {
    it('/api/v1/auth/signup should respond with status code 201 and create a User', (done) => {
        chai.request(server)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/json')
            .send(userDetails)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body.message).to.eql('User has been successfully created');
                done();
            });
    });

    it('/api/v1/auth/signin should respond with status code 201 and login a User', (done) => {
        chai.request(server)
            .post('/api/v1/auth/signin')
            .set('Accept', 'application/json')
            .send(userDetails)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body.message).to.eql('User has logged in successfully');
                done();
            });
    });
});