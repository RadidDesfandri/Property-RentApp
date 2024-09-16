export interface UserType {
  email?: string;
  otp?: string;
}

export interface FormDataInput {
  username: string;
  phone: string;
  password: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface UserState {
  id: number;
  email: string;
  username: string;
  phone: string;
  role: string;
  token: string;
  avatar: string;
  isVerify: boolean;
  provider: Provider | null;
}

enum Provider {
  GOOGLE,
  TWITTER,
  FACEBOOK,
  CREDENTIAL,
}
