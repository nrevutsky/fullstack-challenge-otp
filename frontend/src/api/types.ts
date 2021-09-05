export interface ILogInRequestBody {
  email: string;
}

export interface ICheckOTPRequestBody {
  email: string;
  otp: string;
}

export interface ILogInResponseData {
  message: string;
}

export interface ICheckOTPResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface IGetUserResponseData {
  email: string;
}
