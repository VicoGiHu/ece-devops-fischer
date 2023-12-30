const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Web App API', () => {
  it('should retrieve all items', async () => {
    const res = await chai.request(app).get('/items');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should add a new item', async () => {
    const newItem = { name: 'Test Item', description: 'This is a test item.' };
    const res = await chai.request(app).post('/items').send(newItem);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('_id');
    expect(res.body.name).to.equal(newItem.name);
    expect(res.body.description).to.equal(newItem.description);
  });
});