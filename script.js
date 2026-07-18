const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
let theme = prefersLight ? "light" : "dark";

applyTheme();

themeBtn?.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme();
});

function applyTheme() {
    if (theme === "light") {
        root.setAttribute("data-theme", "light");
        themeBtn.textContent = "☀️";
    } else {
        root.removeAttribute("data-theme");
        themeBtn.textContent = "🌙";
    }
}

function copyIP(el) {
    const ip = "strafepvp.cc";

    navigator.clipboard.writeText(ip).then(() => {
        const original = el.textContent;
        el.textContent = "¡Copiada! ✓";
        el.classList.add("copied");

        setTimeout(() => {
            el.textContent = original;
            el.classList.remove("copied");
        }, 1800);
    }).catch(() => {
        alert("No se pudo copiar la IP.");
    });
}

async function loadStatus() {
    const playerCount = document.getElementById("playerCount");
    const statusText = document.getElementById("statusText");

    try {
        const res = await fetch("https://api.mcstatus.io/v2/status/java/strafepvp.cc");
        const data = await res.json();

        if (data.online) {
            statusText.textContent = "Servidor en línea";
            playerCount.textContent = data.players.online;
        } else {
            statusText.textContent = "Servidor fuera de línea";
            playerCount.textContent = "0";
        }
    } catch {
        statusText.textContent = "Error de conexión";
        playerCount.textContent = "—";
    }
}

loadStatus();
setInterval(loadStatus, 30000);

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});