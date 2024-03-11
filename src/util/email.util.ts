
export const passwordResetTemplete = (otp: string): string => {
    
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #012623; color: #444; margin: 0; padding: 0;">
    
        <div style="max-width: 100%; margin: 0 auto; padding: 20px; background-color: #F2F2F2; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://res.cloudinary.com/dwuz1qpec/image/upload/v1709160886/Screenshot_2024-02-28_223548_bdqkat.png" alt="Company Logo" style="max-width: 150px;">
            </div>
            <h2 style="text-align: center; color: #32D9BA;">Password Reset</h2>
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
    `;
}
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

export const statusChangedEmailTemplate = (name: string, status: string): string => {

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
            <h2 style="text-align: center; color: #32D9BA;">Status Updated</h2>
            <p style="text-align: left;">Dear ${name}</p>
            <p style="text-align: center;">Application for practitioner roll on Tolbert Health App has been ${status} 🩺💊</p>
            <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #888;">If you haven't applied for this role, safely ignore this email.</p>
        </div>
    
    </body>
    </html>        
    `
}