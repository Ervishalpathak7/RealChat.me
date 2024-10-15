// Function to send email
export const sendMail = async (to, otp) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // or any email service you prefer
        auth: {
          user: process.env.EMAIL_USER, // Your email
          pass: process.env.EMAIL_PASS, // Your email password
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
      };
  
      await transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${to}`);
      return true; // Indicate success
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // Indicate failure
    }
  };
  
  