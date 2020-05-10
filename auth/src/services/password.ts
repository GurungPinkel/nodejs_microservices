import bcrypt from 'bcrypt';

export class Password {

  static hash = async (password: string) => {
    const ramdomRounds = Math.floor(Math.random() * 10) + 5;
    const generatedSalt = await bcrypt.genSalt(ramdomRounds);
    const hashedPassword = bcrypt.hash(password, generatedSalt);
    return hashedPassword;
  }

  static compare = async (storedPassword: string, suppliedPassword: string) => {
    return await bcrypt.compare(suppliedPassword, storedPassword);
  }
}