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

        const message =
`🎮 НОВАЯ ЗАЯВКА

🎯 Игра: ${game}
🔗 Steam: ${steam}
👤 TG: ${telegram}

📝 Описание:
${description || "нет"}`;

        const tg = await fetch(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    chat_id: process.env.CHAT_ID,
                    text: message
                })
            }
        );

        const data = await tg.json();

        if (!data.ok) throw new Error("Telegram error");

        res.json({ success: true });

    } catch (e) {
        res.json({ success: false });
    }
});

app.listen(process.env.PORT || 3000);
