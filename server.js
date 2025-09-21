const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve your contact form
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/send", async (req, res) => {
    try {
        const { firstName, lastName, email, queryType, message } = req.body;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "owocoded@gmail.com",
                pass: "wwhodulzvzcarvxx", // 🔑 use App Password here
            },
        });

        await transporter.sendMail({
            from: `"Contact Form" <your-email@gmail.com>`,
            to: "owocoded@gmail.com",
            subject: `New ${queryType} from ${firstName} ${lastName}`,
            text: message,
            replyTo: email,
        });

        res.send("✅ Email sent successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Failed to send email");
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
