document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // Pegar dados do paciente
  // =======================
  const user = JSON.parse(sessionStorage.getItem("usuario"));
  if (!user || user.tipo !== "paciente") {
    alert("Você não está logado como paciente!");
    window.location.href = "index.html";
  }

  // Nome no cabeçalho e hero
  document.getElementById("nomeUser").textContent = user.nome;
  document.getElementById("nomeUserHero").textContent = user.nome;

  // Clica no nome e vai para o perfil
  document.getElementById("nomeUser").addEventListener("click", () => {
    window.location.href = "Pperfil.html";
  });

  // =======================
  // Modal & Consultas
  // =======================
  const listaConsultas = document.getElementById("listaConsultas");
  const historicoDiv = document.getElementById("historico");
  const saveBtn = document.getElementById("saveConsulta");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const cancelBtn = document.getElementById("cancel");

  document.getElementById("openModal").addEventListener("click", () => modal.style.display = "flex");
  closeModal.addEventListener("click", () => modal.style.display = "none");
  cancelBtn.addEventListener("click", () => modal.style.display = "none");

  // Consultas do paciente
  let todasConsultas = JSON.parse(localStorage.getItem("consultas")) || [];
  let consultasProximas = todasConsultas.filter(c => c.cpfPaciente === user.cpf && new Date(c.data + " " + c.hora) >= new Date());
  let consultasHistorico = todasConsultas.filter(c => c.cpfPaciente === user.cpf && new Date(c.data + " " + c.hora) < new Date());

  function renderConsultas() {
    // === Próximas consultas ===
    listaConsultas.innerHTML = "";
    if (consultasProximas.length === 0) {
      listaConsultas.innerHTML = '<div class="card empty">Nenhuma consulta marcada.</div>';
    } else {
      consultasProximas.forEach(c => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${c.especialidade}</h3>
          <div class="meta">Médico(a): ${c.medico}</div>
          <div class="meta">Data: ${c.data} - Hora: ${c.hora}</div>
          <div class="meta">Local: ${c.local}</div>
        `;
        listaConsultas.appendChild(card);
      });
    }

    // Atualizar próxima consulta no hero
    const heroProx = document.querySelector(".prox-consulta");
    if (consultasProximas.length > 0) {
      const prox = consultasProximas[0];
      heroProx.innerHTML = `<strong>Próxima consulta:</strong> ${prox.data} - ${prox.hora} (${prox.especialidade})`;
    } else {
      heroProx.innerHTML = `<strong>Próxima consulta:</strong> — (nenhuma marcada)`;
    }

    // === Histórico de consultas ===
    historicoDiv.innerHTML = "";
    if (consultasHistorico.length === 0) {
      historicoDiv.innerHTML = '<div class="card empty">Ainda sem histórico. Quando você confirmar ou criar consultas, elas aparecem aqui.</div>';
    } else {
      consultasHistorico.forEach(c => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${c.especialidade}</h3>
          <div class="meta">Médico(a): ${c.medico}</div>
          <div class="meta">Data: ${c.data} - Hora: ${c.hora}</div>
          <div class="meta">Local: ${c.local}</div>
        `;
        historicoDiv.appendChild(card);
      });
    }
  }

  // Salvar nova consulta
  saveBtn.addEventListener("click", async () => {
    const novaConsulta = {
      cpfPaciente: user.cpf, // identificar paciente
      especialidade: document.getElementById("especialidade").value,
      medico: document.getElementById("medico").value,
      data: document.getElementById("data").value,
      hora: document.getElementById("hora").value,
      local: document.getElementById("local").value
    };

    if (!novaConsulta.especialidade || !novaConsulta.medico || !novaConsulta.data || !novaConsulta.hora || !novaConsulta.local) {
      alert("Preencha todos os campos antes de salvar!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("acao", "agendar_consulta");
      formData.append("cpfPaciente", novaConsulta.cpfPaciente);
      formData.append("especialidade", novaConsulta.especialidade);
      formData.append("medico", novaConsulta.medico);
      formData.append("data", novaConsulta.data);
      formData.append("hora", novaConsulta.hora);
      formData.append("local", novaConsulta.local);

      const resp = await fetch("api.php", {
        method: "POST",
        body: formData
      });

      const json = await resp.json();
      if (!resp.ok || json.status !== "ok") {
        alert(json.mensagem || "Erro ao agendar consulta no servidor.");
        return;
      }

      // Persistir também localmente para exibir imediatamente
      todasConsultas.push(novaConsulta);
      localStorage.setItem("consultas", JSON.stringify(todasConsultas));

      // Atualiza listas filtradas
      consultasProximas = todasConsultas.filter(c => c.cpfPaciente === user.cpf && new Date(c.data + " " + c.hora) >= new Date());
      consultasHistorico = todasConsultas.filter(c => c.cpfPaciente === user.cpf && new Date(c.data + " " + c.hora) < new Date());

      renderConsultas();
      modal.style.display = "none";

      // limpar inputs
      document.getElementById("especialidade").value = "";
      document.getElementById("medico").value = "";
      document.getElementById("data").value = "";
      document.getElementById("hora").value = "";
      document.getElementById("local").value = "";
    } catch (e) {
      alert("Falha de comunicação com o servidor ao agendar consulta.");
      console.error(e);
    }
  });

  renderConsultas();

  // =======================
  // TABS
  // =======================
  const tabs = document.querySelectorAll(".tabs button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.dataset.tab;
      tabContents.forEach(content => {
        content.style.display = (content.id === target) ? "block" : "none";
      });
    });
  });
});
