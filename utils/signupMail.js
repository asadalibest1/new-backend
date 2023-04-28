import nodemailer from "nodemailer";
import { SendSignupTemplate } from "./SendSignupTemplate";


export const generateOtp = () => Math.floor(100000 + Math.random() * 900000);


const Mail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.user,
        pass: process.env.pass,
    },

});

export default Mail;

export const signupMail = async (user) => {
    return await Mail.sendMail({
        to: user?.email,
        from: { name: 'Artizyou', address: process.env.user, },
        subject: "Artizyou",
        service: "gmail",
        html: SendSignupTemplate()
    })
}

