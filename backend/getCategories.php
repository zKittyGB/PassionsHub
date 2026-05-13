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

$stmt = $pdo->prepare("SELECT 
				phcID AS ID,
				phcGroupe AS groupe,
				phcName AS name,
				phcDateCreation AS dateCreation 
			FROM 
				passionsHubCategories");
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

$categories = [];

foreach ($results as $result) {
	$groupe = ucfirst($result['groupe']);

	if (!isset($categories[$groupe])) {
		$categories[$groupe] = [];
	}

	$result['name'] = ucfirst($result['name']);
	$result['ID'] = $result['ID'];

	$categories[$groupe][] = $result;
}


echo json_encode($categories);
