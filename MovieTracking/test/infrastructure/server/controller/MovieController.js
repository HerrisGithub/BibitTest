const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assemble = require('../../../../src/assemble');
const application = assemble();
const { app } = application;
const { expect } = chai;
const { log } = console;
chai.use(chaiHttp);
describe('Movie controller test', () => {
  it('Search movie should be suceessful with valid inputs', (done) => {
    chai.request(app)
      .get('/api/v1/search?s=Batman&page=1')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Search detail movie should be suceessful with valid inputs', (done) => {
    chai.request(app)
      .get('/api/v1/detail/tt2409658?plot=short')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });
});
