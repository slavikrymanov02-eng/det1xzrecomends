require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/submit", async (req, res) => {
    try {
        const { game, steam, telegram, description } = req.body;

        const message = `
🎮 Новая заявка на обзор

🎯 Игра: ${game}

🔗 Steam:
${steam}

👤 Telegram:
${telegram}

📝 Описание:
${description}
`;

        const response = await fetch(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: process.env.CHAT_ID,
                    text: message
                })
            }
        );

        const data = await response.json();

        if (!data.ok) {
            throw new Error("Telegram API Error");
        }

        res.json({
            success: true
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
