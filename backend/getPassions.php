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

$userID = isset($_POST['userID']) ? (int) decryptId($_POST['userID']) : 0;

// ----------------------
// Get liked passions by user
// ----------------------
$likedPassions = [];
if ($userID !== 0) {
	$stmt = $pdo->prepare("
				SELECT
					phlPassionID
				FROM 
					passionsHubLikes
				WHERE 
					phlUserID = :userID");

	$stmt->execute(['userID' => $userID]);
	$likedPassions = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
}

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
				t.phtDateCreation AS dateCreation,
				COUNT(l.phlPassionID) AS likes
			FROM passionsHubTopics t
			LEFT JOIN passionsHubCategories c
				ON t.phtCategoryID = c.phcID
			LEFT JOIN passionsHubUsers a
				ON t.phtAuthorID = a.phuID
			LEFT JOIN passionsHubLikes l
				ON l.phlPassionID = t.phtID
			GROUP BY t.phtID
			ORDER BY t.phtDateCreation DESC");
$stmt->execute([]);

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

$passions = [];

foreach ($results as $result) {
	$encryptedID = encryptId($result['ID']);

	if(in_array($result['ID'], $likedPassions)) {
		$result['liked'] = true;
	} else {
		$result['liked'] = false;
	}

	$result['ID'] = $encryptedID;
	$result['author'] = (object)[];
	$result['categoryID'] = $result['categoryID'];
	$result['author']->username = $result['username'];
	$result['keywords'] = json_decode($result['keywords']); // devient un tableau PHP
	$result['pictures'] = json_decode($result['pictures']); // devient un tableau PHP
	$result['cover_picture'] = $result['pictures'][0]; // devient un tableau PHP
	unset($result['username']);

	$passions[] = $result;
}

echo json_encode($passions);