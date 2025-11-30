// Carregar dados quando a página abrir
window.onload = () => {
    fetch("listar_medico.php")
        .then(r => r.json())
        .then(dados => {
            mostrarPacientes(dados.novos_pacientes);
            mostrarConsultas(dados.consultas_agendadas);
        });
};

function mostrarPacientes(pacientes) {
    let tabela = document.getElementById("tabelaPacientes");
    tabela.innerHTML = "";

    pacientes.forEach(p => {
        tabela.innerHTML += `
            <tr>
                <td>${p.id_prontuario}</td>
                <td>${p.nome_paciente}</td>
                <td>${p.sexo}</td>
                <td>${p.data_cadastro}</td>
            </tr>
        `;
    });
}

function mostrarConsultas(consultas) {
    let tabela = document.getElementById("tabelaConsultas");
    tabela.innerHTML = "";

    consultas.forEach(c => {
        tabela.innerHTML += `
            <tr>
                <td>${c.id_consulta}</td>
                <td>${c.nome_paciente}</td>
                <td>${c.data_consulta}</td>
                <td>${c.motivo}</td>
                <td>${c.nome_funcionario}</td>
            </tr>
        `;
    });
}
