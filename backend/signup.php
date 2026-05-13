<?php
// ----------------------
// CORS headers
// ----------------------
header("Access-Control-Allow-Origin: https://www.zkittygb.fr");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(200);
	exit;
}

// ----------------------
// Include database connection (PDO)
// ----------------------
require __DIR__ . '/../../../../include/db.php';

// ----------------------
// Initialize errors array
// ----------------------
$errors = [
	"name" => [],
	"username" => [],
	"email" => [],
	"password" => [],
	"picture" => [],
];

// ----------------------
// Check if request contains file (multipart/form-data) or JSON
// ----------------------
$name = trim($_POST['name'] ?? '');
$username = trim($_POST['username'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$pictureFile = $_FILES['picture'] ?? null;

// ----------------------
// Validations
// ----------------------
if (!$name) $errors['name'][] = "Ce champ est obligatoire";
if (!$username) $errors['username'][] = "Ce champ est obligatoire";
if (!$email) $errors['email'][] = "Ce champ est obligatoire";
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'][] = "Email invalide";
if (!$password) $errors['password'][] = "Ce champ est obligatoire";
elseif (strlen($password) < 8) $errors['password'][] = "Le mot de passe doit contenir au moins 8 caractères";

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
// ----------------------
// Handle picture upload
// ----------------------
$profilePictureName = null;
if ($pictureFile && $pictureFile['error'] === 0) {
	$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
	$fileTmpPath = $pictureFile['tmp_name'];
	$fileExtension = strtolower(pathinfo($pictureFile['name'], PATHINFO_EXTENSION));

	if (!in_array($fileExtension, $allowedExtensions)) {
		$errors['picture'][] = "Format de fichier non autorisé";
	} else {
		// Créer un nom unique
		$profilePictureName = uniqid('profile_') . '.' . $fileExtension;
		$uploadDir = __DIR__ . '/../public/pictures/profilePictures/';
		if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

		$destPath = $uploadDir . $profilePictureName;
		if (!move_uploaded_file($fileTmpPath, $destPath)) {
			$errors['picture'][] = "Erreur lors de l'upload de l'image";
		}
	}
}

// Return picture errors if any
if (!empty($errors['picture'])) {
	echo json_encode(["success" => false, "errors" => $errors]);
	exit;
}

// ----------------------
// Hash password
// ----------------------
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
	// ----------------------
	// Check if email already exists
	// ----------------------
	$stmt = $pdo->prepare("SELECT phuID FROM passionsHubUsers WHERE phuEmail = :email");
	$stmt->execute(['email' => $email]);
	if ($stmt->rowCount() > 0) $errors['email'][] = "Email déjà utilisé";

	// ----------------------
	// Check if username already exists
	// ----------------------
	$stmt = $pdo->prepare("SELECT phuID FROM passionsHubUsers WHERE phuUsername = :username");
	$stmt->execute(['username' => $username]);
	if ($stmt->rowCount() > 0) $errors['username'][] = "Username déjà utilisé";

	if (!empty($errors['email']) || !empty($errors['username'])) {
		echo json_encode(["success" => false, "errors" => $errors]);
		exit;
	}

	// ----------------------
	// Insert user
	// ----------------------
	$stmt = $pdo->prepare("
        INSERT INTO passionsHubUsers 
        (phuName, phuUsername, phuEmail, phuPassword, phuProfilePicture, phuDateCreation)
        VALUES (:name, :username, :email, :password, :picture, NOW())
    ");
	$stmt->execute([
		'name' => $name,
		'username' => $username,
		'email' => $email,
		'password' => $hashedPassword,
		'picture' => $profilePictureName
	]);

	echo json_encode(["success" => true, "message" => "Utilisateur enregistré"]);
} catch (PDOException $e) {
	error_log("Erreur DB : " . $e->getMessage());
	http_response_code(500);
	echo json_encode([
		"success" => false,
		"errors" => ["general" => ["Erreur lors de l'inscription"]]
	]);
}
