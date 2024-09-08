import jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  interface JwtPayload {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
  }
}

const JWT_SECRET = process.env.JWT_SECRET ?? 'TEMPORARY_SECRET';

export const signToken = (
  data: Record<string, unknown>,
  expiresIn?: string,
) => {
  return jwt.sign(data, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject('Invalid token');
      } else {
        resolve(decoded);
      }
    });
  });
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
