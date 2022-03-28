import * as jwt from 'jsonwebtoken';
import * as fs from 'fs'

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8').trim();

const decodeToken = (tokenInfo: any): string | jwt.JwtPayload | undefined => {
  try {
    const token = jwt.verify(tokenInfo, secret);
    console.log('decodetoken', token);
    return token;
  } catch (error) {
    // if (tokenInfo === undefined || !tokenInfo) {
    //   const objError = { status: 401, message: 'Token not found' };
    //   throw objError;
    // }
    // const objError = { status: 401, message: 'Expired or invalid token' };
    // throw objError;
    console.log('error >><<<<<<<')
  }
};

export default decodeToken;

