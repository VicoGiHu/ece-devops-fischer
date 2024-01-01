import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('User API', () => {
  it('should get all users', async () => {
    const res = await chai.request(app).get('/api/users');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should get a single user by ID', async () => {
    const userId = 1;
    const res = await chai.request(app).get(`/api/users/${userId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(userId);
  });

  it('should create a new user', async () => {
    const newUser = {
      username: 'vic_fish',
      email: 'vicfish@example.com',
    };

    const res = await chai.request(app).post('/api/users').send(newUser);
    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.include(newUser);
  });

  it('should update an existing user', async () => {
    const userId = 1;
    const updatedUser = {
      username: 'updated_username',
      email: 'updated_email@example.com',
    };

    const res = await chai.request(app).put(`/api/users/${userId}`).send(updatedUser);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.include(updatedUser);
  });

  it('should delete an existing user', async () => {
    const userId = 1;

    const res = await chai.request(app).delete(`/api/users/${userId}`);
    expect(res).to.have.status(204);

    const getUserRes = await chai.request(app).get(`/api/users/${userId}`);
    expect(getUserRes).to.have.status(404);
  });
});
