function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!username || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  const userData = localStorage.getItem("user_" + username);

  if (!userData) {
    alert("Usuário não encontrado. Cadastre-se primeiro.");
    return;
  }

  const user = JSON.parse(userData);

  if (user.password === password && user.role === role) {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("role", role);

    if (role === "medico") {
      window.location.href = "gerenciamento.html";
    } else {
      window.location.href = "Painel-paciente.html";
    }
  } else {
    alert("Usuário, senha ou função incorretos!");
  }
}

function cadastrar() {
  window.location.href = "cadastro.html";
}
