const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");

function getNextResetTime() {
  const now = new Date();
  const next = new Date();
  next.setHours(24, 0, 0, 0);
  return next;
}

function updateTimer() {
  const now = new Date();
  const diff = nextReset - now;

  if (diff <= 0) {
    // sorteia número entre 1 e 100
    const num = Math.floor(Math.random() * 100) + 1;
    localStorage.setItem("resultadoHoje", num);
    localStorage.setItem("ultimaData", new Date().toDateString());
    resultEl.textContent = "Resultado de hoje: " + num;
    nextReset = getNextResetTime();
  } else {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    timerEl.textContent =
      `${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}`;
  }
}

let nextReset = getNextResetTime();
const salvo = localStorage.getItem("ultimaData");
if (salvo === new Date().toDateString()) {
  resultEl.textContent =
    "Resultado de hoje: " + localStorage.getItem("resultadoHoje");
}

setInterval(updateTimer, 1000);
