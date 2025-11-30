<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "conexao.php";

$resposta = [];

// 🔵 Listar pacientes cadastrados (últimos 10)
$sql1 = $pdo->query("
    SELECT * FROM prontuario ORDER BY data_cadastro DESC LIMIT 10
");
$resposta["novos_pacientes"] = $sql1->fetchAll(PDO::FETCH_ASSOC);

// 🔵 Listar consultas futuras
$sql2 = $pdo->query("
    SELECT c.id_consulta, c.data_consulta, c.motivo,
           p.nome_paciente, f.nome AS nome_funcionario
    FROM consultas c
    INNER JOIN prontuario p ON c.id_prontuario = p.id_prontuario
    INNER JOIN funcionario f ON f.ID = (SELECT cargo_ID FROM funcionario LIMIT 1)
    WHERE c.data_consulta >= NOW()
    ORDER BY c.data_consulta ASC
    LIMIT 20
");
$resposta["consultas_agendadas"] = $sql2->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resposta);
?>
