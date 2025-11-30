# PingdSaúde - Sistema de Gerenciamento de Saúde

## 📋 Visão Geral
O PingdSaúde é um sistema web desenvolvido para gerenciamento de clínicas e consultórios médicos, facilitando o agendamento de consultas, prontuários eletrônicos e o gerenciamento de pacientes e profissionais de saúde.

## ✨ Funcionalidades Principais

### 👨‍⚕️ Módulo Médico
- Cadastro e gerenciamento de médicos e equipe de saúde
- Visualização de agenda de consultas
- Acesso a prontuários eletrônicos
- Prescrição de medicamentos
- Registro de diagnósticos e evoluções

### 👤 Módulo Paciente
- Cadastro de pacientes
- Agendamento de consultas
- Acesso ao histórico médico
- Visualização de exames e receitas

### 🏥 Módulo Administrativo
- Gerenciamento de usuários
- Controle de acessos
- Relatórios e estatísticas
- Configurações do sistema

## 🛠️ Tecnologias Utilizadas

### Frontend
- HTML5, CSS3 e JavaScript puro
- Design responsivo
- Interface intuitiva e amigável

### Backend
- PHP para lógica de negócios
- MySQL para armazenamento de dados
- API RESTful para comunicação

### Banco de Dados
- Estrutura relacional otimizada
- Tabelas para usuários, pacientes, médicos e prontuários
- Controle de acesso baseado em perfis

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Servidor web (Apache/Nginx)
- PHP 7.4 ou superior
- MySQL 5.7 ou superior
- Navegador web atualizado

### Instalação

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   ```

2. Importe o banco de dados:
   - Acesse o arquivo `Bd/bd.tcc.sql`
   - Execute o script SQL no seu servidor MySQL

3. Configure a conexão com o banco de dados:
   - Edite o arquivo `conexao.php` com as credenciais do seu banco de dados

4. Acesse o sistema:
   - Abra o navegador e acesse `http://localhost/caminho/para/projeto`

## 📁 Estrutura de Diretórios

```
├── Bd/                  # Scripts do banco de dados
├── css/                 # Folhas de estilo
├── js/                  # Arquivos JavaScript
├── php/                 # Backend PHP
├── Imagem/              # Imagens do sistema
├── api.php              # Endpoints da API
├── index.php            # Página inicial
└── painelogin.html      # Painel de login
```

## 🔒 Segurança
- Senhas criptografadas
- Controle de sessão
- Proteção contra SQL Injection
- Validação de dados no cliente e servidor

## 📝 Licença
Este projeto está sob a licença [MIT](LICENSE).

## 👥 Autores
- [Seu Nome] - Desenvolvedor Principal

## 📞 Suporte
Para suporte, entre em contato através do e-mail: [seu-email@exemplo.com]

## 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.
