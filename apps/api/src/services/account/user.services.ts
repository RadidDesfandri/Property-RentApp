import { User } from '@prisma/client';
import { checkExistingAccount } from '../checkExistingAccount';
import prisma from '@/prisma';
import { transporter } from '@/helper/nodemailer';
import { generateOtp } from '@/helper/generateOtp';
import { verify } from 'jsonwebtoken';
import { hashPass } from '@/helper/hashPass';
import { compare } from 'bcrypt';
import { createToken } from '@/helper/createToken';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
const secret = process.env.SECRET_KEY || 'nezztar';
const base_url = process.env.BASE_URL_BACKEND || 'http://localhost:8000/api';
const imageurl = process.env.BASE_URL_BACKEND + '/public/welcome2.svg';
const imageurl2 = process.env.BASE_URL_BACKEND + '/public/forgotpassmail.svg';
const imageurl3 = process.env.BASE_URL_BACKEND + '/public/changeemail.svg';
export const registerServicesUser = async (body: User) => {
  try {
    const { email } = body;
    await checkExistingAccount(email);
    const { otp, token } = generateOtp(email);
    const otpExpired = new Date();
    otpExpired.setMinutes(otpExpired.getMinutes() + 5);
    const createUser = await prisma.user.create({
      data: { email, otp, otpExpired },
    });
    const templatePath = path.join(__dirname, '../../templates', 'otp.hbs');
    const dataEmail = {
      email,
      otp,
      imageurl,
    };
    const templateSource = await fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(dataEmail);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verifikasi Email',
      html,
    });
    return { createUser, token };
  } catch (error) {
    throw error;
  }
};

export const verifyOtpServices = async (token: string, otp: string) => {
  try {
    const verifytoken = verify(token, secret) as { email: string; otp: string };
    const email = verifytoken.email;
    const otpToken = verifytoken.otp;
    const currentTime = new Date();
    if (otp !== otpToken) throw new Error('Invalid otp code');
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User notfound');
    if (user.otpExpired && currentTime > user.otpExpired)
      throw new Error('Otp code has expired');
    const updateUser = await prisma.user.update({
      where: { email },
      data: {
        isVerify: true,
        otp: null,
        otpExpired: null,
      },
    });
    return updateUser;
  } catch (error) {
    throw error;
  }
};

export const updateDatauserServices = async (body: User, token: string) => {
  try {
    const { username, phone, password } = body;
    const verifyToken = verify(token, secret) as { email: string };
    const email = verifyToken.email;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');
    const hashPassword = await hashPass(password!);
    const updateData = await prisma.user.update({
      where: { email },
      data: {
        username: username,
        phone: phone,
        password: hashPassword,
      },
    });
    return updateData;
  } catch (error) {
    throw error;
  }
};

export const loginUserServices = async (body: User) => {
  try {
    const { email, password } = body;
    const user = await prisma.user.findFirst({
      where: { email, provider: 'CREDENTIAL' },
    });
    if (!user) throw new Error('User not found');
    if (!user.isVerify)
      throw new Error('User not verify, please verify for login');
    const isValidPass = await compare(password!, user.password!);
    if (!isValidPass)
      throw new Error(
        'Password is incorrect, please enter the correct password',
      );
    const payload = {
      id: user.id,
      role: user.role,
      username: user.username!,
      email: user.email,
      phone: user.phone!,
    };
    const token = createToken(payload, '1d');
    return { user, token };
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordUserServices = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) throw new Error('Email not found');
    if (user.provider !== 'CREDENTIAL')
      throw new Error(
        'Cannot change password if logged with social media account',
      );
    const payload = {
      id: user.id,
      role: user.role,
      username: user.username!,
      email: user.email,
      phone: user.phone!,
    };
    const templatePath = path.join(
      __dirname,
      '../../templates',
      'forgot-pass.hbs',
    );
    const token = createToken(payload, '30m');
    const link =
      process.env.BASE_URL_FRONTEND +
      `/account/forgot-password-user/${token}`;
    const dataEmail = {
      link,
      username: user.username ? user.username : user.email,
      imageurl2,
    };
    const templateSource = await fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(dataEmail);
    await transporter.sendMail({
      to: email,
      subject: 'Reset password',
      html,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordUserServices = async (
  userId: string,
  password: string,
) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId, provider: 'CREDENTIAL' },
    });
    if (!user) throw new Error('Account not found');
    const hashPassword = await hashPass(password);
    const newPass = await prisma.user.update({
      where: { id: userId },
      data: { password: hashPassword },
    });
    return newPass;
  } catch (error) {
    throw error;
  }
};

export const editUserServices = async (
  body: User,
  userId: string,
  file?: string,
) => {
  try {
    const { username, phone } = body;
    const existuser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existuser) throw new Error('User notfound');
    if (existuser.provider !== 'CREDENTIAL')
      throw new Error(
        'Cannot update data if logged in with social media account',
      );
    const avatar = file
      ? `${base_url}/public/avatar/${file}`
      : existuser!.avatar;
    const updUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        phone,
        avatar,
      },
    });
    const payload = {
      id: updUser.id,
      role: updUser.role,
      username: updUser.username!,
      email: updUser.email,
      phone: updUser.phone!,
    };
    const token = createToken(payload, '1d');
    return { updUser, token };
  } catch (error) {
    throw error;
  }
};

export const sendVerificationChangeMailServices = async (email: string) => {
  try {
    const mail = await prisma.user.findFirst({
      where: { email },
    });
    if (!mail) throw new Error('Email not found!');
    if (mail.provider !== 'CREDENTIAL')
      throw new Error('Cannot change email if login using social media');
    const payload = {
      id: mail.id,
      role: mail.role,
      username: mail.username!,
      email: mail.email,
      phone: mail.phone!,
    };
    const templatePath = path.join(
      __dirname,
      '../../templates',
      'changeemail.hbs',
    );
    const token = createToken(payload, '30m');
    const link =
      process.env.BASE_URL_FRONTEND + `/account/change-email-user/${token}`;
    const dataEmail = {
      link,
      username: mail.username ? mail.username : mail.email,
      imageurl3,
    };
    const templateSource = await fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(dataEmail);
    await transporter.sendMail({
      to: email,
      subject: 'Ganti email',
      html,
    });
    return mail;
  } catch (error) {
    throw error;
  }
};

export const changeEmailServices = async (id: string, email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    if (!user) throw new Error('Account not found');
    if (user.provider !== 'CREDENTIAL')
      throw new Error('Cannot change email if login using social media');
    const { otp, token } = generateOtp(email);
    const otpExpired = new Date();
    otpExpired.setMinutes(otpExpired.getMinutes() + 5);
    const newMail = await prisma.user.update({
      where: { id },
      data: { email, otp, otpExpired, isVerify: false },
    });
    const templatePath = path.join(__dirname, '../../templates', 'otp.hbs');
    const dataEmail = {
      email,
      otp,
      imageurl,
    };
    const templateSource = await fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(dataEmail);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verifikasi Email',
      html,
    });
    return { newMail, token };
  } catch (error) {
    throw error;
  }
};
