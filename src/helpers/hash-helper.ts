import * as bcrypt from 'bcrypt';

export class Hash {
  static async make(value: string): Promise<string> {
    return Hash.brcryptHash(value);
  }

  static async compare(value: string, hashedValue: string): Promise<boolean> {
    return Hash.brcryptVerify(value, hashedValue);
  }

  static async brcryptHash(value: string, saltRounds = 10): Promise<string> {
    const hash = await bcrypt.hash(value, saltRounds);

    return hash;
  }

  static async brcryptVerify(
    value: string,
    hashedValue: string,
  ): Promise<boolean> {
    const result = await bcrypt.compare(value, hashedValue);

    return result;
  }
}
