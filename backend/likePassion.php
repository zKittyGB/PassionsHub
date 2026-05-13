<?php
// ----------------------
// CORS headers
// ----------------------
header("Access-Control-Allow-Origin: https://www.zkittygb.fr");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require __DIR__ . '/../../../../include/db.php';
require __DIR__ . '/../../../../include/encrypt.php';

// ----------------------
// Get POST data
// ----------------------
$userID = isset($_POST['userID']) ? (int) decryptId($_POST['userID']) : 0;
$passionID = isset($_POST['passionID']) ? (int) decryptId($_POST['passionID']) : 0;

if ($userID === 0 || $passionID === 0) {
	echo json_encode([
		'success' => false,
		'errors' => [
			'general' => ['Vous devez être connecté pour utiliser cette fonctionnalité']
		]
	]);
	exit;
}

// ----------------------
// Check if user already liked
// ----------------------
$stmt = $pdo->prepare("
	SELECT 1
	FROM passionsHubLikes
	WHERE phlUserID = :userID
	AND phlPassionID = :passionID
");

$stmt->execute([
	'userID' => $userID,
	'passionID' => $passionID
]);

$likeExists = (bool) $stmt->fetchColumn();

// ----------------------
// Toggle like
// ----------------------
if ($likeExists) {
	// REMOVE LIKE
	$stmt = $pdo->prepare("
		DELETE FROM passionsHubLikes
		WHERE phlUserID = :userID
		AND phlPassionID = :passionID
	");
} else {
	// ADD LIKE
	$stmt = $pdo->prepare("
		INSERT INTO passionsHubLikes (phlUserID, phlPassionID)
		VALUES (:userID, :passionID)
	");
}

$stmt->execute([
	'userID' => $userID,
	'passionID' => $passionID
]);

echo json_encode([
	'success' => true,
	'action' => $likeExists ? 'removed' : 'added'
]);
exit;
