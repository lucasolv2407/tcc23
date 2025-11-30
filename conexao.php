<?php
// Credenciais do banco de dados
$host = 'localhost';
$db   = 'grc';   // mantém o nome do banco do seu primeiro código
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$conn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($conn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Para usar a conexão posteriormente, a variável $pdo estará disponível.
?>
