let last = 0;

async function send() {
    const now = Date.now();

    if (now - last < 8000) {
        document.getElementById("status").innerText =
            "⏳ Подожди немного";
        return;
    }

    const game = document.getElementById("game").value;
    const steam = document.getElementById("steam").value;
    const telegram = document.getElementById("telegram").value;
    const desc = document.getElementById("desc").value;

    if (!game || !steam || !telegram) {
        document.getElementById("status").innerText =
            "Заполни поля";
        return;
    }

    document.getElementById("status").innerText = "Отправка...";

    try {
        const res = await fetch("/submit", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ game, steam, telegram, description: desc })
        });

        const data = await res.json();

        document.getElementById("status").innerText =
            data.success ? "🔥 Отправлено" : "Ошибка";

        if (data.success) {
            last = Date.now();
        }

    } catch {
        document.getElementById("status").innerText =
            "Ошибка сервера";
    }
}
