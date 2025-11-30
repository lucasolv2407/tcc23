
function mostrarLogin(){ fade("menuPrincipal", "loginBox"); }
function mostrarCadastro(){ fade("menuPrincipal", "cadastroBox"); }

function voltarMenu(){
  fade("loginBox", "menuPrincipal");
  fade("cadastroBox", "menuPrincipal");
}

function fade(saidaID, entradaID){
  const out = document.getElementById(saidaID);
  const into = document.getElementById(entradaID);

  if(out){
    out.classList.remove("visible");
    out.classList.add("hidden");
  }
  if(into){
    into.classList.remove("hidden");
    into.classList.add("visible");
  }
}

/* --- LOGIN --- */
function mudarLogin(){
  const tipo = document.getElementById("tipoLogin").value;
  document.getElementById("loginPaciente").classList.toggle("hidden", tipo !== "paciente");
  document.getElementById("loginMedico").classList.toggle("hidden", tipo !== "medico");
}

function loginPaciente(){
  const cpf = document.getElementById("cpfLogin").value.trim();
  const senha = document.getElementById("senhaLoginP").value.trim();

  const user = JSON.parse(localStorage.getItem("pac_" + cpf));

  if(!user) return alert("CPF não encontrado!");
  if(user.senha !== senha) return alert("Senha incorreta!");

  sessionStorage.setItem("usuario", JSON.stringify(user));
  alert("Login realizado!");
  window.location.href = "painel-paciente.html";
}

function loginMedico(){
  const crm = document.getElementById("crmLogin").value.trim();
  const senha = document.getElementById("senhaLoginM").value.trim();

  const user = JSON.parse(localStorage.getItem("med_" + crm));

  if(!user) return alert("CRM não encontrado!");
  if(user.senha !== senha) return alert("Senha incorreta!");

  sessionStorage.setItem("usuario", JSON.stringify(user));
  alert("Login realizado!");

  if(user.funcao === "admin"){
    window.location.href = "paineladmin.html";
  } else {
    window.location.href = "gerenciamento.html";
  }
}

/* --- CADASTRO --- */
function mudarCadastro(){
  const tipo = document.getElementById("tipoCadastro").value;
  document.getElementById("cadPaciente").classList.toggle("hidden", tipo !== "paciente");
  document.getElementById("cadMedico").classList.toggle("hidden", tipo !== "medico");
}

function getInputValue(id){
  return document.getElementById(id)?.value.trim() || "";
}

async function cadastrarPaciente(){
  const nome = getInputValue("pNome");
  const cpf = getInputValue("pCPF");
  const idade = getInputValue("pIdade");
  const telefone = getInputValue("pTelefone");
  const genero = document.getElementById("pGenero")?.value || "";
  const senha = getInputValue("pSenha");

  if(!nome || !cpf || !idade || !telefone || !genero || !senha)
    return alert("Preencha todos os campos!");

  const paciente = {tipo:"paciente", nome, cpf, idade, telefone, genero, senha};

  try {
    const body = new URLSearchParams({
      acao: "cad_paciente",
      nome,
      cpf,
      idade,
      telefone,
      genero,
      senha
    });

    const resposta = await fetch("api.php", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
      body: body.toString()
    });

    const resultado = await resposta.json();
    if(!resposta.ok || resultado.status !== "ok")
      throw new Error(resultado.mensagem || "Erro ao cadastrar paciente.");

    localStorage.setItem("pac_" + cpf, JSON.stringify(paciente));
    alert("Cadastro realizado!");
    voltarMenu();
  } catch (erro) {
    console.error("Erro ao cadastrar paciente", erro);
    alert("Não foi possível cadastrar o paciente. " + erro.message);
  }
}

async function cadastrarMedico(){
  const nome = getInputValue("mNome");
  const crm = getInputValue("mCRM");
  const endereco = getInputValue("mEndereco");
  const funcao = document.getElementById("mFuncao")?.value || "";
  const senha = getInputValue("mSenha");

  if(!nome || !crm || !endereco || !funcao || !senha)
    return alert("Preencha todos os campos!");

  const medico = {tipo:"medico", nome, crm, endereco, funcao, senha};

  try {
    const body = new URLSearchParams({
      acao: "cad_medico",
      nome,
      crm,
      endereco,
      funcao,
      senha
    });

    const resposta = await fetch("api.php", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
      body: body.toString()
    });

    const resultado = await resposta.json();
    if(!resposta.ok || resultado.status !== "ok")
      throw new Error(resultado.mensagem || "Erro ao cadastrar médico.");

    localStorage.setItem("med_" + crm, JSON.stringify(medico));
    alert("Cadastro realizado!");
    voltarMenu();
  } catch (erro) {
    console.error("Erro ao cadastrar médico", erro);
    alert("Não foi possível cadastrar o médico. " + erro.message);
  }
}
