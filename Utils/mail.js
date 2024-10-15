import { Resend } from "resend";




// Function to send email
export const sendEmail = async ({ to, otp }) => {

const resend = new Resend(process.env.RESEND_API_KEY);
console.log('resend:', resend);
  try {
    const emailData = {
      from: 'RealChat@xiagroup.tech',
      to,
      subject: 'RealChat OTP', 
      html: `<p>Your OTP is: ${otp}</p>`,
    };
    const response = await resend.emails.send(emailData);
    console.log('Email sent successfully:', response);
    return response;

  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

