import { transporter } from '@/helper/nodemailer';
import { checkExistingAccount } from '../checkExistingAccount';
import { generateOtp } from '@/helper/generateOtp';
import prisma from '@/prisma';
import { Tenant } from '@prisma/client';
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
export const registerServicesTenant = async (body: Tenant) => {
  try {
    const { email } = body;
    await checkExistingAccount(email);
    const { otp, token } = generateOtp(email);
    const otpExpired = new Date();
    otpExpired.setMinutes(otpExpired.getMinutes() + 5);
    const createTenant = await prisma.tenant.create({
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
    return { createTenant, token };
  } catch (error) {
    throw error;
  }
};

export const verifyOtpServicesTenant = async (token: string, otp: string) => {
  try {
    const verifytoken = verify(token, secret) as { email: string; otp: string };
    const email = verifytoken.email;
    const otpToken = verifytoken.otp;
    const currentTime = new Date();
    if (otp !== otpToken) throw new Error('Invalid otp code');
    const user = await prisma.tenant.findUnique({ where: { email } });
    if (!user) throw new Error('User notfound');
    if (user.otpExpired && currentTime > user.otpExpired)
      throw new Error('Otp code has expired');
    const updateUser = await prisma.tenant.update({
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

export const updateDataTenantServices = async (body: Tenant, token: string) => {
  try {
    const { username, phone, password } = body;
    const verifyToken = verify(token, secret) as { email: string };
    const email = verifyToken.email;
    const user = await prisma.tenant.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');
    const hashPassword = await hashPass(password!);
    const updateData = await prisma.tenant.update({
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

export const loginTenantServices = async (body: Tenant) => {
  try {
    const { email, password } = body;
    const user = await prisma.tenant.findFirst({
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

export const forgotPasswordTenantServices = async (email: string) => {
  try {
    const user = await prisma.tenant.findFirst({
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
      `/account/forgot-password-tenant/${token}`;
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

export const resetPasswordTenantServices = async (
  userId: string,
  password: string,
) => {
  try {
    const user = await prisma.tenant.findFirst({
      where: { id: userId, provider: 'CREDENTIAL' },
    });
    if (!user) throw new Error('Account not found');
    const hashPassword = await hashPass(password);
    const newPass = await prisma.tenant.update({
      where: { id: userId },
      data: { password: hashPassword },
    });
    return newPass;
  } catch (error) {
    throw error;
  }
};

export const editTenantServices = async (
  body: Tenant,
  userId: string,
  file?: string,
) => {
  try {
    const { username, phone } = body;
    const existuser = await prisma.tenant.findUnique({
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
    const updUser = await prisma.tenant.update({
      where: { id: userId, provider: 'CREDENTIAL' },
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

export const sendVerificationChangeMailTServices = async (email: string) => {
  try {
    const mail = await prisma.tenant.findFirst({
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
      process.env.BASE_URL_FRONTEND + `/account/change-email-tenant/${token}`;
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

export const changeEmailTServices = async (id: string, email: string) => {
  try {
    const user = await prisma.tenant.findFirst({
      where: { id },
    });
    if (!user) throw new Error('Account not found');
    if (user.provider !== 'CREDENTIAL')
      throw new Error('Cannot change email if login using social media');
    const { otp, token } = generateOtp(email);
    const otpExpired = new Date();
    otpExpired.setMinutes(otpExpired.getMinutes() + 5);
    const newMail = await prisma.tenant.update({
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
