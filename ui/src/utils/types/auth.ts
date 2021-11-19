export interface IAuthForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  role: string;
  age: number;
  sex: string;
  mobile: string;
  resetToken?: string;
}

export interface IProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  credentials: {
    mobile: string;
    address: string;
    age: number;
    sex: 'male' | 'female';
  };
  image?: {
    public_id: string;
    secure_url: string;
  };
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  role?: string;
  credentials?: {
    mobile?: string;
    sex?: string;
    age?: string;
    address?: string;
  };
  image?: {
    public_id: string;
    secure_url: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface IFormAccount {
  form: HTMLFormElement | undefined | FormData;
  userId: string;
  token: string;
}

export type SignupResult = {
  success: boolean;
  data: {
    message: string;
    user: IUser;
  };
};

export type SigninResult = {
  success: boolean;
  data: {
    token: string;
    user?: IUser;
  };
};

export interface IPwdDisplay {
  showPwd: boolean;
  showConfirmPwd: boolean;
}

export interface ISex {}
