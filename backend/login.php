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
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

// ----------------------
// Initialize errors array (array per field)
// ----------------------
$errors = [
	"email" => [],
	"password" => [],
];

// ----------------------
// Server-side validations
// ----------------------
if (!$email) $errors['email'][] = "Ce champ est obligatoire";
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'][] = "Email invalide";
if (!$password) $errors['password'][] = "Ce champ est obligatoire";

// Return errors if any
$hasErrors = false;
foreach ($errors as $fieldErrors) {
	if (!empty($fieldErrors)) {
		$hasErrors = true;
		break;
	}
}

if ($hasErrors) {
	echo json_encode(["success" => false, "errors" => $errors]);
	exit;
}

try {
	// ----------------------
	// Check the user by email
	// ----------------------
	$stmt = $pdo->prepare("SELECT phuID AS ID, phuName AS name, phuUsername AS username, phuEmail AS email, phuPassword, phuProfilePicture AS profilePicture, phuDateCreation AS dateCreation
                           FROM passionsHubUsers 
                           WHERE phuEmail = :phuEmail");
	$stmt->execute(['phuEmail' => $email]);
	$user = $stmt->fetch(PDO::FETCH_ASSOC);

	// ----------------------
	// Check if username exists and password is correct
	// ----------------------
	if (!$user || !password_verify($password, $user['phuPassword'])) {
		echo json_encode([
			"success" => false,
			"errors" => ["general" => ["Email ou mot de passe incorrect"]]
		]);
		exit;
	}

	// ----------------------
	// Unset password from user object
	// ----------------------
	unset($user['phuPassword']);

	// ----------------------
	// Generate and store a new session token
	// ----------------------
	$token = bin2hex(random_bytes(16));

	$expiration = time() + 3600; // 1h
	$stmt = $pdo->prepare("UPDATE passionsHubUsers SET phuSessionToken = :token, phuSessionExpiration = :exp WHERE phuID = :ID");
	$stmt->execute(['token' => $token, 'exp' => $expiration, 'ID' => $user['ID']]);

	// ----------------------
	// Encrypt L'ID de l'utilisateur
	// ----------------------
	$user['ID'] = encryptId($user['ID']);

	echo json_encode(["success" => true, "token" => $token, "user" => $user]);
} catch (PDOException $e) {
	error_log("Erreur DB : " . $e->getMessage());
	http_response_code(500);
	echo json_encode([
		"success" => false,
		"errors" => ["general" => ["Erreur lors de la connexion"]]
	]);
}
