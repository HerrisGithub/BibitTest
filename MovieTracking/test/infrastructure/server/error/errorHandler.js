const { describe, it, before } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const assemble = require('../../../../src/assemble');
const db = require('../../../../src/infrastructure/db/pure');

const { expect } = chai;

chai.use(chaiHttp);

describe('Global error case test', () => {
  let app = null;
  before(async () => {
    await db.init();
    const application = assemble();
    app = application.app;
  });

  it('Should respond 404 with not found url', (done) => {
    chai.request(app).get('/not/found/url').end((err, res) => {
      if (err) done(err);
      expect(res).to.have.status(404);
      done();
    });
  });

  it('Should response 404 with invalid http method', (done) => {
    chai.request(app).patch('/api/v1/signin').end((err, res) => {
      if (err) done(err);
      expect(res).to.have.status(404);
      done();
    });
  });
});
