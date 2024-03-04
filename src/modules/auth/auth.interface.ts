export interface IValidateUser {
  id: number;
  email: string;
  name: string;
  address: string;
  phone: string;
  age: number;
  salt: string;
  created_at: Date;
  updated_at: Date;
}

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface TokenPayload {
  id: number;
  email: string;
}
