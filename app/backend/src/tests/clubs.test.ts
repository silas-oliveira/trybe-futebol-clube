import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';


import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const CLUBS_RETURN =	[
  {
    "id": 1,
    "clubName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "clubName": "Bahia"
  },
  {
    "id": 3,
    "clubName": "Botafogo"
  },
  {
    "id": 4,
    "clubName": "Corinthians"
  },
  {
    "id": 5,
    "clubName": "Cruzeiro"
  },
  {
    "id": 6,
    "clubName": "Ferroviária"
  },
  {
    "id": 7,
    "clubName": "Flamengo"
  },
  {
    "id": 8,
    "clubName": "Grêmio"
  },
  {
    "id": 9,
    "clubName": "Internacional"
  },
  {
    "id": 10,
    "clubName": "Minas Brasília"
  },
  {
    "id": 11,
    "clubName": "Napoli-SC"
  },
  {
    "id": 12,
    "clubName": "Palmeiras"
  },
  {
    "id": 13,
    "clubName": "Real Brasília"
  },
  {
    "id": 14,
    "clubName": "Santos"
  },
  {
    "id": 15,
    "clubName": "São José-SP"
  },
  {
    "id": 16,
    "clubName": "São Paulo"
  }
]

describe('Clubs test', () => {

  let chaiHttpResponse: Response;
  
  before(async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs')
  });

  it('Espera que o status seja 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Espera que tenha o body seja um array', async () => {
    expect(chaiHttpResponse.body).to.be.an('array');
  });

  it('Espera que o retorno de "clubs" seja igual ao esperado', async () => {
    expect(chaiHttpResponse.body).to.deep.equal(CLUBS_RETURN);
  });
  
});
