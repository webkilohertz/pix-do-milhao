
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");
const krontimerEl = document.getElementById("krontimer");
const kronresultadoEl = document.getElementById("kronresult");
const avatarDisplay = document.getElementById("kronavatarDisplay");

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


function salvar(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}
function ler(chave) {
  const v = localStorage.getItem(chave);
  return v ? JSON.parse(v) : null;
}

// Avatar
function atualizarAvatar() {
  const avatar = ler("avatar") || "🙂";
  avatarDisplay.textContent = avatar;
  avatarInput.value = avatar;
}
/* avatarInput.addEventListener("input", () => {
  const valor = avatarInput.value.trim().slice(0,2);
  salvar("avatar", valor || "🙂");
  atualizarAvatar();
}); */

// Sorteio diário
function novoSorteio() {
  const numero = Math.floor(Math.random() * 100) + 1;
  const hoje = new Date().toDateString();
  salvar("ultimoSorteio", hoje);
  salvar("numeroSorteado", numero);
  return numero;
}

function verificarSorteio() {
  const hoje = new Date().toDateString();
  const ultimo = ler("ultimoSorteio");
  if (ultimo !== hoje) {
    return novoSorteio();
  } else {
    return ler("numeroSorteado");
  }
}

// Cronômetro até meia-noite
function tempoRestante() {
  const agora = new Date();
  const amanha = new Date();
  amanha.setHours(24, 0, 0, 0);
  const diff = amanha - agora;
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}

function atualizar() {
  const numero = verificarSorteio();
  resultadoEl.textContent = `Resultado de hoje: ${numero}`;
  timerEl.textContent = `Próximo sorteio em: ${tempoRestante()}`;
  atualizarAvatar();
}
setInterval(atualizar, 1000);
atualizar();

let nextReset = getNextResetTime();
const salvo = localStorage.getItem("ultimaData");
if (salvo === new Date().toDateString()) {
  resultEl.textContent =
    "Resultado de hoje: " + localStorage.getItem("resultadoHoje");
}

setInterval(updateTimer, 1000);
