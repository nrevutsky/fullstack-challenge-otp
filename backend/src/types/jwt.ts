export enum TOKEN_TYPE {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
}

export interface ITokenData {
  email: string;
  type: TOKEN_TYPE;
}
