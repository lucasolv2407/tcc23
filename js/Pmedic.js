// ---------- STORAGE ----------
const STORAGE_KEY = 'consultas_medmais';
let consultas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const PRONTUARIO_KEY = 'prontuario';
let prontuario = localStorage.getItem(PRONTUARIO_KEY) || '';

const PACIENTES_KEY = 'pacientes_medmais';
let pacientes = JSON.parse(localStorage.getItem(PACIENTES_KEY)) || [];

// ---------- SAVE ----------
const saveConsultas = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(consultas));
const savePacientes = () => localStorage.setItem(PACIENTES_KEY, JSON.stringify(pacientes));

// ---------- ATUALIZAR SELECT DO MODAL ----------
function updatePacienteSelect() {
  const select = document.getElementById("paciente");

  select.innerHTML = `<option value="">Selecione um paciente</option>`;

  pacientes.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}

// ---------- ABRIR / FECHAR MODAL ----------
function openModal() {
  updatePacienteSelect();
  document.getElementById("consulta-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("consulta-modal").style.display = "none";
}

// ---------- ADICIONAR CONSULTA ----------
function addConsultaModal() {
  const paciente = document.getElementById('paciente').value;
  const especialidade = document.getElementById('especialidade').value.trim();
  const medico = document.getElementById('medico').value.trim();
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const status = document.getElementById('status').value;

  if (!paciente || !especialidade || !medico || !data || !hora) {
    alert("Preencha todos os campos.");
    return;
  }

  consultas.push({ paciente, especialidade, medico, data, hora, status });
  saveConsultas();
  renderConsultas();
  closeModal();
}

// ---------- RENDER CONSULTAS ----------
function renderConsultas() {
  const container = document.getElementById('consultas');

  container.innerHTML = `
    <div class="consultas-header">
      <h2>Consultas</h2>
      <button class="btn-new" onclick="openModal()">➕ Nova Consulta</button>
    </div>
  `;

  if (consultas.length === 0) {
    container.innerHTML += `<p>Nenhuma consulta cadastrada.</p>`;
    return;
  }

  consultas.forEach((c, i) => {
    const card = document.createElement("div");
    card.className = "consulta-card";

    card.innerHTML = `
      <div class="consulta-header">
        <h4>${c.paciente}</h4>
        <span class="status ${c.status}">${c.status}</span>
      </div>

      <p><strong>Especialidade:</strong> ${c.especialidade}</p>
      <p><strong>Médico:</strong> ${c.medico}</p>
      <p><strong>Data:</strong> ${c.data} — ${c.hora}</p>

      <button class="excluir-btn" data-index="${i}">🗑️ Excluir</button>
    `;

    container.appendChild(card);
  });
}

// ---------- RENDER PACIENTES ----------
function renderPacientes() {
  const container = document.getElementById('pacientes');

  container.innerHTML = `
    <h2>Lista de Pacientes</h2>
  `;

  if (pacientes.length === 0) {
    container.innerHTML += `<p>Nenhum paciente cadastrado.</p>`;
    return;
  }

  pacientes.forEach(p => {
    container.innerHTML += `<p>👤 ${p}</p>`;
  });
}

// ---------- RENDER PRONTUÁRIO ----------
function renderProntuario() {
  const div = document.getElementById('prontuarioSalvo');

  if (!prontuario) {
    div.innerHTML = `<p>Prontuário vazio.</p>`;
    return;
  }

  div.innerHTML = `
    <div class="consulta-card">
      <p>${prontuario}</p>
    </div>
  `;
}

// ---------- FORM PRONTUÁRIO ----------
document.getElementById("formProntuario").addEventListener("submit", e => {
  e.preventDefault();

  const texto = document.getElementById("textoProntuario").value.trim();
  if (!texto) return alert("Digite algo antes de salvar.");

  prontuario = texto;
  localStorage.setItem(PRONTUARIO_KEY, prontuario);
  renderProntuario();
  e.target.reset();
});

// ---------- EXCLUIR CONSULTA ----------
document.addEventListener("click", e => {
  if (e.target.classList.contains("excluir-btn")) {
    const index = e.target.dataset.index;

    if (confirm("Deseja excluir esta consulta?")) {
      consultas.splice(index, 1);
      saveConsultas();
      renderConsultas();
    }
  }
});

// ---------- SIDEBAR ----------
document.querySelectorAll(".sidebar a[data-target]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = e.target.dataset.target;

    document.querySelectorAll(".tab-content").forEach(sec => sec.style.display = "none");
    document.getElementById(target).style.display = "block";

    document.querySelectorAll(".sidebar a").forEach(a => a.classList.remove("active"));
    link.classList.add("active");

    if (target === "consultas") renderConsultas();
    if (target === "pacientes") renderPacientes();
    if (target === "prontuario") renderProntuario();
  });
});

// ---------- SAIR ----------
document.querySelector(".exit").addEventListener("click", () => {
  if (confirm("Deseja realmente sair?")) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PACIENTES_KEY);
    localStorage.removeItem(PRONTUARIO_KEY);
    localStorage.removeItem("darkMode");

    window.location.href = "../html/painelogin.html";
  }
});

// ---------- DARK MODE ----------
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const btn = document.querySelector(".dark-toggle");
  btn.textContent = document.body.classList.contains("dark")
    ? "☀️ Modo Claro"
    : "🌙 Modo Escuro";

  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Carregar modo noturno salvo
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  document.querySelector(".dark-toggle").textContent = "☀️ Modo Claro";
}

// ---------- INITIAL RENDER ----------
renderConsultas();
renderPacientes();
renderProntuario();
