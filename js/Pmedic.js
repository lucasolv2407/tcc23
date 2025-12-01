// ---------- STORAGE ----------
const STORAGE_KEY = 'consultas_medmais';
let consultas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const PRONTUARIO_KEY = 'prontuario';
let prontuario = localStorage.getItem(PRONTUARIO_KEY) || '';

const PACIENTES_KEY = 'pacientes_medmais';
let pacientes = JSON.parse(localStorage.getItem(PACIENTES_KEY)) || [];

// Médico logado (ajuste a chave se necessário)
const medicoLogado = JSON.parse(sessionStorage.getItem('usuario') || 'null');


// ---------- SAVE ----------
const saveConsultas = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(consultas));
const savePacientes = () => localStorage.setItem(PACIENTES_KEY, JSON.stringify(pacientes));

// ---------- ATUALIZAR SELECT DO MODAL ----------
function updatePacienteSelect() {
//   const select = document.getElementById("paciente");

  carregarPacientesProntuario('paciente');

  // select.innerHTML = `<option value="">Selecione um paciente</option>`;

  // pacientes.forEach(p => {
  //   const opt = document.createElement("option");
  //   opt.value = p;
  //   opt.textContent = p;
  //   select.appendChild(opt);
  // });
}

// ---------- CARREGAR PACIENTES PARA PRONTUÁRIO ----------
async function carregarPacientesProntuario(id) {
  const select = document.getElementById(id);
  if (!select) return;

  select.innerHTML = '<option value="">Selecione um paciente</option>';

  if (!medicoLogado) {
    return; // sem médico logado, não carrega
  }

  try {
    const formData = new FormData();
    formData.append('acao', 'listar_pacientes_medico');
    formData.append('id_medico', medicoLogado.id);

    const resp = await fetch('api.php', {
      method: 'POST',
      body: formData
    });

    const json = await resp.json();
    if (!resp.ok || !Array.isArray(json.pacientes)) {
      console.error('Erro ao carregar pacientes do servidor', json);
      return;
    }

    document.getElementById('medico').value = medicoLogado.nome;

    json.pacientes.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.nome;
      select.appendChild(opt);
    });
  } catch (e) {
    console.error('Falha ao carregar pacientes para prontuário', e);
  }
}

function openModal() {
  updatePacienteSelect();
  document.getElementById("consulta-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("consulta-modal").style.display = "none";
}

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
async function renderPacientes() {
  const container = document.getElementById('pacientes');

  container.innerHTML = `
    <h2>Lista de Pacientes</h2>
  `;

  if (!medicoLogado) {
    container.innerHTML += `<p>Médico não identificado na sessão.</p>`;
    return;
  }

  try {
    const formData = new FormData();
    formData.append('acao', 'listar_pacientes_medico');
    formData.append('id_medico', medicoLogado.id);

    const resp = await fetch('api.php', {
      method: 'POST',
      body: formData
    });

    const json = await resp.json();
    if (!resp.ok || !Array.isArray(json.pacientes) || json.pacientes.length === 0) {
      container.innerHTML += `<p>Nenhum paciente cadastrado.</p>`;
      return;
    }

    json.pacientes.forEach(p => {
      const linha = document.createElement('p');
      linha.textContent = `👤 ${p.nome} - Telefone: ${p.telefone}`;
      container.appendChild(linha);
    });
  } catch (e) {
    console.error('Erro ao listar pacientes', e);
    container.innerHTML += `<p>Erro ao carregar pacientes.</p>`;
  }
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
document.getElementById("formProntuario").addEventListener("submit", async e => {
  e.preventDefault();

  const texto = document.getElementById("textoProntuario").value.trim();
  if (!texto) {
    alert("Digite algo antes de salvar.");
    return;
  }

  const selectPaciente = document.getElementById('pacienteProntuario');
  const idPaciente = selectPaciente ? selectPaciente.value : '';

  if (!idPaciente) {
    alert('Selecione um paciente.');
    return;
  }

  if (!medicoLogado || !medicoLogado.id) {
    alert('Médico não identificado na sessão.');
    return;
  }

  const idMedico = medicoLogado.id;

  try {
    const formData = new FormData();
    formData.append("acao", "salvar_prontuario");
    formData.append("id_paciente", idPaciente);
    formData.append("id_medico", idMedico);
    formData.append("texto", texto);

    const resp = await fetch("api.php", {
      method: "POST",
      body: formData
    });

    const json = await resp.json();
    if (!resp.ok || json.status !== "ok") {
      alert(json.mensagem || "Erro ao salvar prontuário no servidor.");
      return;
    }

    prontuario = texto;
    localStorage.setItem(PRONTUARIO_KEY, prontuario);
    renderProntuario();
    e.target.reset();
  } catch (err) {
    console.error(err);
    alert("Falha de comunicação com o servidor ao salvar o prontuário.");
  }
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
    if (target === "prontuario") {
      renderProntuario();
      carregarPacientesProntuario('pacienteProntuario');
    }
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
