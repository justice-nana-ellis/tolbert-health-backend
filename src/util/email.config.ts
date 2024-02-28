import nodemailer from "nodemailer";
export const sendEmail = (template: string, to: string, subject: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const mailOptions = {
        from: `Takomall <${process.env.USER_EMAIL}>`,
        to,
        subject,
        html: template,
    };
    // @ts-ignore
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return error;
        } else {
            return "Email sent";
        }
    });
};