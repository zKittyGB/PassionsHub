<?php
// ----------------------
// CORS headers
// ----------------------
header("Access-Control-Allow-Origin: https://www.zkittygb.fr");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(200);
	exit;
}

// ----------------------
// JSON response header
// ----------------------
header("Content-Type: application/json");

// ----------------------
// Get JSON data from React
// ----------------------
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
	echo json_encode([
		"success" => false,
		"errors" => ["general" => ["Données invalides"]]
	]);
	exit;
}

// ----------------------
// Include database connection (PDO)
// ----------------------
require __DIR__ . '/../../../../include/db.php';
require __DIR__ . '/../../../../include/encrypt.php';

// ----------------------
// Sanitize input
// ----------------------
$userID = $data['userID'];
$userID = decryptId($userID);
$token = $data['token'] ?? '';

if (!$userID || !$token) {
	echo json_encode([
		"success" => false,
		"errors" => ["general" => ["Données manquantes"]]
	]);
	exit;
}

try {
	$stmt = $pdo->prepare("SELECT phuSessionToken, phuSessionExpiration 
                           FROM passionsHubUsers 
                           WHERE phuID = :phuID");
	$stmt->execute(['phuID' => $userID]);
	$user = $stmt->fetch(PDO::FETCH_ASSOC);

	if (!$user) {
		echo json_encode(["success" => false]);
		exit;
	}

	// ----------------------
	// Check if token is valid
	// ----------------------
	if ($user['phuSessionToken'] === $token && $user['phuSessionExpiration'] > time()) {
		echo json_encode(["success" => true]);
	} else {
		echo json_encode(["success" => false]);
	}
} catch (PDOException $e) {
	error_log("Erreur DB : " . $e->getMessage());
	http_response_code(500);
	echo json_encode([
		"success" => false,
		"errors" => ["general" => ["Erreur lors de la connexion"]]
	]);
}
