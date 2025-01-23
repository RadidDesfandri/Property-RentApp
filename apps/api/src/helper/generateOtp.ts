import { sign } from "jsonwebtoken";


const secret = process.env.SECRET_KEY || 'nezztar';

export const generateOtp = (email: string) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let otp = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex].toUpperCase();
  }
  const token = sign({email, otp}, secret, {expiresIn: "1h"})

  return {otp, token};
};
