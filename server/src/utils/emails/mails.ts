import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL || "wahabmhar@gmail.com",
        pass: process.env.MY_PASSWORD || "rjnn ydqe qkop yxxo",
    },
});

export const verficationEmail = async (email: string, name: string, token: string) => {
    console.log("Credetaials", {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    });
    const url = `${process.env.BASE_URL}:${process.env.LOCAL_PORT}/api/users/verify/${token}`;
    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please click on the link below to confirm your email address:</p>
        <p>Verify Your Email</p>
        <a href=${url}>${url}</a>
        
        `,
    };
    await transporter.sendMail(mailOptions);
};
