import bcrypt from "bcryptjs";

export default function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}