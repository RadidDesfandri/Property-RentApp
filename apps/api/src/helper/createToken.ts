import { sign } from 'jsonwebtoken';

interface IPayload {
  id: string;
  role: string;
  username: string;
  email: string;
  phone: string;
}

const secret = process.env.SECRET_KEY || 'nezztar';

export const createToken = (payload: IPayload, expires: string) => {
  const token = sign(payload, secret, { expiresIn: expires });
  return token;
};
