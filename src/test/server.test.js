import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
const { expect } = chai;

describe('BASE ENDPOINT', () => {
  it('should return a 200 status code', (done) => {
    chai.request(app)
      .get('/')
      .set('accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.eql('Welcome to AutoMart');
        done();
      });
  });
});
