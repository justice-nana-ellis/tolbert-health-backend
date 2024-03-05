
export const generateUniqueRandomDigits = (): string => {
    const digits = '0123456789';
    let otp = '';
    while (otp.length < 4) {
      const randomDigit = digits[Math.floor(Math.random() * digits.length)];
      if (!otp.includes(randomDigit)) {
        otp += randomDigit;
      }
    }
    return otp;
  }