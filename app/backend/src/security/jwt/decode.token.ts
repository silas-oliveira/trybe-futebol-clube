import * as jwt from 'jsonwebtoken';
import * as fs from 'fs'

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8').trim();

const decodeToken = (tokenInfo: any): string | jwt.JwtPayload | undefined => {
  try {
    const token = jwt.verify(tokenInfo, secret);
    return token;
  } catch (error) {
    const errorToken = new Error('Invalid token');
    throw errorToken;
  }
};

export default decodeToken;

