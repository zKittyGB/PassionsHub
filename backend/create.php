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
// Include database connection (PDO) & encrypt
// ----------------------
require __DIR__ . '/../../../../include/db.php';
require __DIR__ . '/../../../../include/encrypt.php';

// ----------------------
// Enable PDO exceptions
// ----------------------
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// ----------------------
// Initialize errors array
// ----------------------
$errors = [
	"selectedCategory" => [],
	"title" => [],
	"description" => [],
	"keywords" => [],
	"pictures" => [],
];

// ----------------------
// Get POST data
// ----------------------
$userID = isset($_POST['userID']) ? (int)decryptId($_POST['userID']) : 0;
$selectedCategory = isset($_POST['selectedCategory']) ? (int)$_POST['selectedCategory'] : 0;
$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$keywords = trim($_POST['keywords'] ?? '');
$pictures = $_FILES['pictures'] ?? null;

// ----------------------
// Basic validations
// ----------------------
if (!$selectedCategory) $errors['selectedCategory'][] = "Ce champ est obligatoire";
if (!$title) $errors['title'][] = "Ce champ est obligatoire";
if (!$description) $errors['description'][] = "Ce champ est obligatoire";
if (!$keywords) $errors['keywords'][] = "Ce champ est obligatoire";
if (mb_strlen($keywords, 'UTF-8') > 500) $errors['keywords'][] = "Le total des mots clés ne peut pas dépasser 500 caractères";

// Return early if errors
$hasErrors = array_filter($errors);
if ($hasErrors) {
	echo json_encode(["success" => false, "errors" => $errors]);
	exit;
}

// ----------------------
// Handle keywords
// ----------------------
$keywordsArray = array_filter(array_map('trim', explode(',', $keywords)), fn($kw) => $kw !== '');
$keywordsJson = json_encode($keywordsArray, JSON_UNESCAPED_UNICODE);
if ($keywordsJson === false) {
	$errors['keywords'][] = "Erreur lors de l'encodage des mots-clés";
}

// ----------------------
// Handle pictures upload
// ----------------------
$picturesNames = [];

if (!empty($_FILES['pictures']['name'][0])) {

	if (count($_FILES['pictures']['name']) > 10) {
		$errors['pictures'][] = "Vous ne pouvez pas ajouter plus de 10 images";
	}

	$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
	$uploadDir = __DIR__ . '/../public/pictures/hobbies/';

	if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

	for ($i = 0; $i < count($_FILES['pictures']['name']); $i++) {

		if ($_FILES['pictures']['error'][$i] !== UPLOAD_ERR_OK) {
			$errors['pictures'][] = "Erreur lors de l'upload du fichier " . $_FILES['pictures']['name'][$i];
			continue;
		}

		$tmp = $_FILES['pictures']['tmp_name'][$i];
		$ext = strtolower(pathinfo($_FILES['pictures']['name'][$i], PATHINFO_EXTENSION));

		if (!in_array($ext, $allowedExtensions)) {
			$errors['pictures'][] = "Format non autorisé pour " . $_FILES['pictures']['name'][$i];
			continue;
		}

		$name = uniqid('hobbies_') . '.' . $ext;
		if (!move_uploaded_file($tmp, $uploadDir . $name)) {
			$errors['pictures'][] = "Impossible de déplacer " . $_FILES['pictures']['name'][$i];
			continue;
		}

		$picturesNames[] = $name;
	}
} else {
	$errors['pictures'][] = "Au moins une image est obligatoire";
}

// Return picture errors if any
if (!empty($errors['pictures'])) {
	echo json_encode(["success" => false, "errors" => $errors]);
	exit;
}

// Encode pictures to JSON
$picturesJson = json_encode($picturesNames);
if ($picturesJson === false) {
	$errors['pictures'][] = "Erreur lors de l'encodage des images";
	echo json_encode(["success" => false, "errors" => $errors]);
	exit;
}

// ----------------------
// Debug: log data before insert
// ----------------------
error_log("Insert passionsHubTopics: userID=$userID, categoryID=$selectedCategory, title=$title, descLen=" . strlen($description));
error_log("keywordsJson: $keywordsJson");
error_log("picturesJson: $picturesJson");

// ----------------------
// Insert into DB
// ----------------------
try {
	$stmt = $pdo->prepare("
        INSERT INTO passionsHubTopics
        (phtAuthorID, phtCategoryID, phtTitle, phtDescription, phtKeywords, phtPictures, phtDateCreation, phtDateModification)
        VALUES (:authorID, :categoryID, :title, :description, :keywords, :pictures, NOW(), NOW())
    ");

	$stmt->execute([
		'authorID' => $userID,
		'categoryID' => $selectedCategory,
		'title' => $title,
		'description' => $description,
		'keywords' => $keywordsJson,
		'pictures' => $picturesJson
	]);

	echo json_encode(["success" => true, "message" => "Passion enregistrée !"]);
} catch (PDOException $e) {
	error_log("Erreur DB : " . $e->getMessage());
	http_response_code(500);
	echo json_encode([
		"success" => false,
		"errors" => ["general" => ["Erreur lors de l'ajout de la passion : " . $e->getMessage()]]
	]);
}
