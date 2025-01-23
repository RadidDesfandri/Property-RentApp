import prisma from '@/prisma';
export const checkExistingAccount = async (email: string) => {
  const existUser = await prisma.user.findUnique({ where: { email } });
  const existTenant = await prisma.tenant.findUnique({ where: { email } });
  if (existUser) throw new Error('Email already exist, please change your email');
  if (existTenant) throw new Error('Email already exist, please change your email');
};
