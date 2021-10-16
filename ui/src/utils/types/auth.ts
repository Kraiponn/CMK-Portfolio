export interface IAuthForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  resetToken?: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  image?: {
    public_id: string;
    secure_url: string;
  };
}

export type SignupResult = {
  success: boolean;
  data: {
    message: string;
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
