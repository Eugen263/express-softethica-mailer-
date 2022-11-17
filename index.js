const { TokenStorageController } = require("./token-store");
const { createHmac } = require("crypto")
require("dotenv").config()
const nodemailer = require("nodemailer")
const cors = require("cors")

const express = require("express");
const app = express()

let TokenStor = new TokenStorageController();

app.use(cors({
    origin: "*"
}))

app.get("/tokenizer/get", (req, resp) => {
    console.log("[ TOKENIZER ] Create a token");

    const secret = String(new Date().getMilliseconds() * Math.random());
    const phrase = String(Math.random() * Math.random() * 2 ** Math.random());
    const token = createHmac('sha256', secret).update(phrase).digest('base64url');
    TokenStor.storageSet(token);
    resp.send(token);
})

app.options("/tokenizer/storage", (req, res) => {
    res.send(JSON.stringify(TokenStor.storageGet()))
})

app.options("/tokenizer/use?", (req, res) => {
    const token = req.query.token
    console.log(token);
    res.send(TokenStor.autoRemover(token))

})

app.get("/mail/send?", async (req, res) => {
    const key = req.query.key
    if (TokenStor.autoRemover(key)) {
        const name = req.query.name;
        const phone = req.query.phone;
        const email = req.query.email;
        const message = req.query.message;

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: Number(process.env.PORT),
            secure: false,
            auth: {
                user: process.env.SENDLER_EMAIL,
                pass: process.env.SMTP_PASS
            }
        })

        const mailer = await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.SEND_EMAIL,
            subject: "SoftEthica | Contact form message",
            text: `Phone: ${phone}\n${message}`,
            html: `<p>Phone: ${phone}<br>${message}</p>`
        })

        console.log(`[ SENDING DATA ] ${JSON.stringify(mailer)}`)
        res.send(true)
        return
    }
    res.send(false)
})

app.listen(47345, "127.0.0.1", () => {
    console.log("Hello")
})