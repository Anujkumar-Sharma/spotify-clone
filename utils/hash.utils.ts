import bcrypt from 'bcrypt';

export const hashedPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

export const validatePassword = (
  password: string,
  originalPassword: string,
) => {
  return bcrypt.compare(password, originalPassword);
};
