const form = document.getElementById("gameForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const game = document.getElementById("game").value;
    const steam = document.getElementById("steam").value;
    const telegram = document.getElementById("telegram").value;
    const description = document.getElementById("description").value;

    statusText.textContent = "Отправка...";

    const response = await fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            game,
            steam,
            telegram,
            description
        })
    });

    const data = await response.json();

    if (data.success) {
        statusText.textContent =
            "Заявка успешно отправлена!";
        form.reset();
    } else {
        statusText.textContent =
            "Ошибка при отправке.";
    }
});