export interface IFormSignup {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignupResult {
  success: boolean;
  data: {
    message: string;
  };
}

export interface IFormSignin {
  email: string;
  password: string;
}

export interface IPwdDisplay {
  showPwd: boolean;
  showConfirmPwd: boolean;
}
