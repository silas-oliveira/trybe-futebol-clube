import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';


import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const USER_RETURN =	{
  id: 2,
  username: "User",
  role: "user",
  email: "user@user.com"
}

describe('Login test', () => {

  let chaiHttpResponse: Response;
  
  before(async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'user@user.com', password: 'secret_user' });
  });

  it('Espera que o status seja 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Espera que tenha o body possua as propriedades "user" e "token"', async () => {
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Espera que o retorno de "user" seja igual ao esperado', async () => {
    expect(chaiHttpResponse.body.user).to.deep.equal(USER_RETURN);
  });
  
});
