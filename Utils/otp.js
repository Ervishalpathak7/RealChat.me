

export const generateOtp = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'; // Lowercase letters and numbers
    let otp = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters[randomIndex];
    }
    return otp;
  };
  
  