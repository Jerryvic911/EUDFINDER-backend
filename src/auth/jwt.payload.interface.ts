export interface JwtPayload {
  sub: string; // or userId
  email: string;
  role: string;
}
