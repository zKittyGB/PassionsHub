<?php
// ----------------------
// CORS headers
// ----------------------
header("Access-Control-Allow-Origin: https://www.zkittygb.fr");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/../../../../include/db.php';
require __DIR__ . '/../../../../include/encrypt.php';

header("Content-Type: application/json");

// ----------------------
// Get POST data
// ----------------------
$userID = isset($_POST['userID']) ? (int)decryptId($_POST['userID']) : 0;

$stmt = $pdo->prepare("
			SELECT 
				t.phtID AS ID,
				a.phuUsername AS username,
				t.phtCategoryID AS categoryID,
				c.phcName AS categoryName,
				t.phtTitle AS title,
				t.phtDescription AS description,
				t.phtKeywords AS keywords,
				t.phtPictures AS pictures,
				t.phtDateCreation AS dateCreation
			FROM passionsHubTopics t
			LEFT JOIN passionsHubCategories c
				ON t.phtCategoryID = c.phcID
			LEFT JOIN passionsHubUsers a
				ON t.phtAuthorID = a.phuID
			WHERE t.phtAuthorID = :userID
			ORDER BY t.phtDateCreation DESC
			");

$stmt->execute([
	'userID' => $userID
]);

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

$topics = [];

foreach ($results as $result) {
	$result['author'] = (object)[];

	$result['ID'] = encryptId($result['ID']);
	$result['categoryID'] = $result['categoryID'];
	$result['author']->username = $result['username'];
	$result['keywords'] = json_decode($result['keywords']); // devient un tableau PHP
	$result['pictures'] = json_decode($result['pictures']); // devient un tableau PHP
	$result['cover_picture'] = $result['pictures'][0]; // devient un tableau PHP

	unset($result['username']);

	$topics[] = $result;	
}

echo json_encode($topics);
