export interface UserAttributes {
  email: string;
  password: string;
}

export interface UserSessionAttributes {
  id: string;
  accessToken: string;
  refreshToken: string;
}