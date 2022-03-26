import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

const token = (infoUser: any) => {
  console.log(infoUser);
  const tokenCreate = jwt.sign({ data: infoUser }, secret, {  expiresIn: '7d', algorithm: 'HS256', });
  return tokenCreate;
};

export default token;