import nodemailer from "nodemailer";
export const sendEmail = async(template: string, to: string, subject: string) => {
    const transporter = nodemailer.createTransport({
        //@ts-ignore
        host: 'smtp.gmail.com',
        port: '465',
        service: "gmail",
        auth: {
            user: "ellisjustice60.c9cemetery@gmail.com",
            pass: "doam uovx uagj ymty"
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const mailOptions = {
        from: `Tolbert <${process.env.USER_EMAIL}>`,
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