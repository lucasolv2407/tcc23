<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "conexao.php";

function responder($dados, int $status = 200): void {
    http_response_code($status);
    echo json_encode($dados);
    exit;
}

$acao = $_POST["acao"] ?? null;

if (!$acao) {
    responder(["erro" => "Nenhuma ação recebida"], 400);
}

switch ($acao) {
    case "cad_paciente":
        $camposObrigatorios = ["nome", "cpf", "idade", "telefone", "genero", "senha"];
        foreach ($camposObrigatorios as $campo) {
            if (empty($_POST[$campo])) {
                responder(["status" => "erro", "mensagem" => "Campo '{$campo}' é obrigatório."], 400);
            }
        }

        $sql = $pdo->prepare("INSERT INTO paciente (nome, cpf, idade, telefone, genero, senha) VALUES (?, ?, ?, ?, ?, ?)");
        $ok = $sql->execute([
            $_POST["nome"],
            $_POST["cpf"],
            $_POST["idade"],
            $_POST["telefone"],
            $_POST["genero"],
            $_POST["senha"]
        ]);

        responder(["status" => $ok ? "ok" : "erro"]);
        break;

    case "cad_medico":
        $camposObrigatorios = ["nome", "crm", "endereco", "funcao", "senha"];
        foreach ($camposObrigatorios as $campo) {
            if (empty($_POST[$campo])) {
                responder(["status" => "erro", "mensagem" => "Campo '{$campo}' é obrigatório."], 400);
            }
        }

        $sql = $pdo->prepare("INSERT INTO medico (nome, crm, endereco, funcao, senha) VALUES (?, ?, ?, ?, ?)");
        $ok = $sql->execute([
            $_POST["nome"],
            $_POST["crm"],
            $_POST["endereco"],
            $_POST["funcao"],
            $_POST["senha"]
        ]);

        responder(["status" => $ok ? "ok" : "erro"]);
        break;

    case "login_paciente":
        $sql = $pdo->prepare("SELECT * FROM paciente WHERE cpf = ? AND senha = ?");
        $sql->execute([$_POST["cpf"] ?? "", $_POST["senha"] ?? ""]);
        $usuario = $sql->fetch();
        responder(["existe" => $usuario ? true : false, "usuario" => $usuario]);
        break;

    case "login_medico":
        $sql = $pdo->prepare("SELECT * FROM medico WHERE crm = ? AND senha = ?");
        $sql->execute([$_POST["crm"] ?? "", $_POST["senha"] ?? ""]);
        $usuario = $sql->fetch();
        responder(["existe" => $usuario ? true : false, "usuario" => $usuario]);
        break;

    default:
        responder(["erro" => "Ação inválida"], 400);
}
