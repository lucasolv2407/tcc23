// ==================== Seleção de elementos ====================
const editarBtn = document.getElementById('editarBtn'); // Perfil
const darkBtn = document.getElementById('darkBtn');
const fotoInput = document.getElementById('fotoInput');
const fotoPerfil = document.getElementById('fotoPerfil');

const inputsPerfil = document.querySelectorAll('input, select, textarea'); // Inputs do perfil
const nomePerfil = document.getElementById('nomePerfil');
const pacienteId = document.getElementById('pacienteId');

const formCadastro = document.getElementById('formCadastro'); // Caso exista cadastro separado

let editando = false;

// ==================== Função para carregar dados ====================
function carregarDados() {
  if(localStorage.getItem("dadosPaciente")) {
    const dados = JSON.parse(localStorage.getItem("dadosPaciente"));

    // Preencher inputs do perfil
    inputsPerfil.forEach(input => {
      if(dados[input.id]) input.value = dados[input.id];
      input.disabled = true; // garante que comece desabilitado
    });

    // Atualizar dados do perfil
    if(dados.nome) nomePerfil.textContent = dados.nome;
    if(dados.cpf) pacienteId.textContent = "Paciente ID: #" + dados.cpf.replace(/\D/g,'').substring(0,5);

    // Preencher o formulário de cadastro se existir
    if(formCadastro) {
      [...formCadastro.elements].forEach(input => {
        if(dados[input.id]) input.value = dados[input.id];
      });
    }
  }

  // Foto do perfil
  if(localStorage.getItem("fotoPerfil")) {
    fotoPerfil.src = localStorage.getItem("fotoPerfil");
  }

  // Dark mode
  if(localStorage.getItem("modoDark") === "true") {
    document.body.classList.add("dark");
    if(darkBtn) darkBtn.textContent = "☀️ Light";
  }
}

// ==================== Salvar dados do perfil ====================
if(editarBtn) {
  editarBtn.addEventListener('click', () => {
    editando = !editando;
    inputsPerfil.forEach(input => input.disabled = !editando);
    editarBtn.textContent = editando ? '💾 Salvar' : '✏️ Editar Perfil';

    if(!editando) {
      let dados = {};
      inputsPerfil.forEach(input => dados[input.id] = input.value);
      localStorage.setItem("dadosPaciente", JSON.stringify(dados));

      if(dados.nome) nomePerfil.textContent = dados.nome;
      if(dados.cpf) pacienteId.textContent = "Paciente ID: #" + dados.cpf.replace(/\D/g,'').substring(0,5);

      alert("✅ Dados salvos na máquina!");
    }
  });
}

// ==================== Salvar dados do cadastro ====================
if(formCadastro) {
  formCadastro.addEventListener("submit", e => {
    e.preventDefault();
    let dados = {};
    [...formCadastro.elements].forEach(input => {
      if(input.id) dados[input.id] = input.value;
    });
    localStorage.setItem("dadosPaciente", JSON.stringify(dados));

    // Atualizar perfil em tempo real
    if(nomePerfil && dados.nome) nomePerfil.textContent = dados.nome;
    if(pacienteId && dados.cpf) pacienteId.textContent = "Paciente ID: #" + dados.cpf.replace(/\D/g,'').substring(0,5);

    alert("✅ Dados do cadastro salvos!");
  });
}

// ==================== Upload de foto ====================
if(fotoInput) {
  fotoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        fotoPerfil.src = reader.result;
        localStorage.setItem("fotoPerfil", reader.result);
      };
      reader.readAsDataURL(file);
    }
  });
}

// ==================== Dark mode ====================
if(darkBtn) {
  darkBtn.addEventListener('click', () => {
    document.body.classList.toggle("dark");
    const darkMode = document.body.classList.contains("dark");
    localStorage.setItem("modoDark", darkMode);
    darkBtn.textContent = darkMode ? "☀️ Light" : "🌙 Dark";
  });
}

// ==================== Inicializar ====================
window.onload = carregarDados;



