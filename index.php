<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>pingdsaude - Login e Cadastro</title>
  <link rel="stylesheet" href="css/Cadastro.css">
  <link rel="icon" type="image/png" href="/Imagem/Medpig.jpg">

</head>
<body>

<div class="box">

  <!-- MENU PRINCIPAL -->
  <div id="menuPrincipal" class="visible">
    <h2>Bem-vindo à pingdsaude</h2>
    <button onclick="mostrarLogin()">Entrar</button>
    <button onclick="mostrarCadastro()">Cadastrar</button>
  </div>

  <!-- LOGIN -->
  <div id="loginBox" class="hidden">
    <h2>Login</h2>

    <select id="tipoLogin" onchange="mudarLogin()">
      <option value="paciente">Paciente (CPF)</option>
      <option value="medico">Médico (CRM)</option>
    </select>

    <!-- LOGIN PACIENTE -->
    <div id="loginPaciente">
      <input type="text" id="cpfLogin" placeholder="CPF">
      <input type="password" id="senhaLoginP" placeholder="Senha">
      <button onclick="loginPaciente()">Entrar como Paciente</button>
    </div>

    <!-- LOGIN MÉDICO -->
    <div id="loginMedico" class="hidden">
      <input type="text" id="crmLogin" placeholder="CRM">
      <input type="password" id="senhaLoginM" placeholder="Senha">
      <button onclick="loginMedico()">Entrar como Médico</button>
    </div>

    <p><span class="linkzinho" onclick="voltarMenu()">Voltar</span></p>
  </div>

  <!-- CADASTRO -->
  <div id="cadastroBox" class="hidden">
    <h2>Cadastro</h2>

    <select id="tipoCadastro" onchange="mudarCadastro()">
      <option value="paciente">Paciente</option>
      <option value="medico">Médico</option>
    </select>

    <!-- Cadastro Paciente -->
    <div id="cadPaciente">
      <input type="text" id="pNome" placeholder="Nome completo">
      <input type="text" id="pCPF" placeholder="CPF">
      <input type="number" id="pIdade" placeholder="Idade">
      <input type="tel" id="pTelefone" placeholder="Telefone">
      <select id="pGenero">
        <option value="">Selecione o gênero</option>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
        <option value="Outro">Outro</option>
      </select>
      <input type="password" id="pSenha" placeholder="Senha">
      <button onclick="cadastrarPaciente()">Cadastrar Paciente</button>
    </div>

    <!-- Cadastro Médico -->
    <div id="cadMedico" class="hidden">
      <input type="text" id="mNome" placeholder="Nome completo">
      <input type="text" id="mCRM" placeholder="CRM">
      <input type="text" id="mEndereco" placeholder="Endereço da clínica">
      <select id="mFuncao">
        <option value="">Selecione</option>
        <option value="medico">Médico</option>
        <option value="admin">Administração</option>
      </select>
      <input type="password" id="mSenha" placeholder="Senha">
      <button onclick="cadastrarMedico()">Cadastrar Médico</button>
    </div>

    <p><span class="linkzinho" onclick="voltarMenu()">Voltar</span></p>
  </div>

</div>

<script src="js/Cadastro.js"></script>
</body>
</html>
