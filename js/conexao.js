function carregarFuncionarios() {
    fetch("listar.php?tabela=funcionario")
        .then(response => response.json())
        .then(dados => {
            let conteudo = document.getElementById("conteudo");
            conteudo.innerHTML = ""; // limpa antes

            dados.forEach(func => {
                conteudo.innerHTML += `
                    <tr>
                        <td>${func.ID}</td>
                        <td>${func.nome}</td>
                        <td>${func.email}</td>
                        <td>${func.cpf_cnpj}</td>
                        <td>${func.crm}</td>
                        <td>${func.cargo_ID}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Erro:", error));
}
