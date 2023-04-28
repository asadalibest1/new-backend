import nodemailer from "nodemailer";
import { SendEmailTemplate } from "./SendEmailTemplate";


export const generateOtp = () => Math.floor(100000 + Math.random() * 900000);


const Mail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.user,
        pass: process.env.pass,
    },

});

export default Mail;

export const sendMail = async (user, otp, url) => {
    return await Mail.sendMail({
        to: user?.email,
        from: { name: 'Artizyou', address: process.env.user, },
        subject: "Password Reset Request",
        service: "gmail",
        html: SendEmailTemplate(user, otp, url)
    })
}

