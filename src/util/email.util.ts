
import dotenv from 'dotenv';
dotenv.config();
// const url = process.env.FRONTEND_REDIRECT_URL;
export interface EmailData {
    // project_id: string;
    // project_name: string;
    // client_name: string;
    // end_date: string;
    // name: string;
    link: string
}
export const forgetPasswordEmailTemplate = (link: string): string =>
    // const { project_id, project_name, client_name, end_date, name } = emailData;
    // const { link } = EmailData;
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #012623; color: #444;">
    
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 15px; background-color: #F2F2F2; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://res.cloudinary.com/dwuz1qpec/image/upload/v1709160886/Screenshot_2024-02-28_223548_bdqkat.png" alt="Company Logo" style="max-width: 150px;">
            </div>
            <h2 style="text-align: center; color: #32D9BA;">Reset Password</h2>
            <p style="text-align: center;">Please enter the OTP (One Time Password) sent to your email:</p>
            
            <div style="text-align: center; margin-top: 20px;">
                <span id="otp1" style="display: inline-block; width: 50px; height: 50px; font-size: 20px; text-align: center; border: none; margin-right: 10px; background-color: #32D9BA; color: #012623; border-radius: 5px; font-weight: bold; line-height: 50px;">1</span>
                <span id="otp2" style="display: inline-block; width: 50px; height: 50px; font-size: 20px; text-align: center; border: none; margin-right: 10px; background-color: #32D9BA; color: #012623; border-radius: 5px; font-weight: bold; line-height: 50px;">2</span>
                <span id="otp3" style="display: inline-block; width: 50px; height: 50px; font-size: 20px; text-align: center; border: none; margin-right: 10px; background-color: #32D9BA; color: #012623; border-radius: 5px; font-weight: bold; line-height: 50px;">3</span>
                <span id="otp4" style="display: inline-block; width: 50px; height: 50px; font-size: 20px; text-align: center; border: none; margin-right: 10px; background-color: #32D9BA; color: #012623; border-radius: 5px; font-weight: bold; line-height: 50px;">4</span>
            </div>
            
            <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #888;">If you didn't request this verification, you can safely ignore this email.</p>
        </div>
    
    </body>
    </html>
    `;

    export const verifyEmailTemplate = (otp: string): string => {

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #012623; color: #444; margin: 0; padding: 0;">
    
        <div style="max-width: 100%; margin: 0 auto; padding: 20px; background-color: #F2F2F2; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://res.cloudinary.com/dwuz1qpec/image/upload/v1709160886/Screenshot_2024-02-28_223548_bdqkat.png" alt="Company Logo" style="max-width: 150px;">
            </div>
            <h2 style="text-align: center; color: #32D9BA;">Email Verification</h2>
            <p style="text-align: center;">Please enter the OTP (One Time Password) sent to your email:</p>
            
            <div style="text-align: center; margin-top: 20px;">
                <span id="otp1" style="display: inline-block; width: 50px; height: 50px; font-size: 20px; text-align: center; border: none; margin-right: 10px; background-color: #32D9BA; color: #012623; border-radius: 0; font-weight: bold; line-height: 50px;">${ parseInt(otp.split('')[0]) }</span>
                <span id="otp2" style="display: inline-block; width: 50px; height: 50px; font-size: 20px; text-align: center; border: none; margin-right: 10px; background-color: #32D9BA; color: #012623; border-radius: 0; font-weight: bold; line-height: 50px;">${ parseInt(otp.split('')[1]) }</span>
                <span id="otp3" style="display: inline-block; width: 50px; height: 50px; font-size: 20px; text-align: center; border: none; margin-right: 10px; background-color: #32D9BA; color: #012623; border-radius: 0; font-weight: bold; line-height: 50px;">${ parseInt(otp.split('')[2]) }</span>
                <span id="otp4" style="display: inline-block; width: 50px; height: 50px; font-size: 20px; text-align: center; border: none; margin-right: 10px; background-color: #32D9BA; color: #012623; border-radius: 0; font-weight: bold; line-height: 50px;">${ parseInt(otp.split('')[3]) }</span>
            </div>
            
            <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #888;">If you didn't request this verification, you can safely ignore this email.</p>
        </div>
    
    </body>
    </html>        
    `
}