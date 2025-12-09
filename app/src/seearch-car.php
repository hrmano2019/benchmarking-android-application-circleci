<?php
// Définit l'en-tête pour une réponse JSON
header('Content-Type: application/json');

// Inclusion de la connexion à la base de données
require_once '../database.php';

// Récupère les paramètres de l'URL et les nettoie
$marque = $_GET['marque'] ?? '';
$modele = $_GET['modele'] ?? '';
$prix_max = $_GET['prix_max'] ?? '';
$annee_min = $_GET['annee_min'] ?? '';

// Construction de la requête SQL de base
$sql = "SELECT marque, modele, annee, prix FROM voitures WHERE 1=1";
$params = [];
$types = '';

// Ajoute les conditions de filtrage à la requête
if (!empty($marque)) {
    $sql .= " AND marque LIKE ?";
    $params[] = '%' . $marque . '%';
    $types .= 's';
}
if (!empty($modele)) {
    $sql .= " AND modele LIKE ?";
    $params[] = '%' . $modele . '%';
    $types .= 's';
}
if (!empty($prix_max)) {
    $sql .= " AND prix <= ?";
    $params[] = $prix_max;
    $types .= 'i';
}
if (!empty($annee_min)) {
    $sql .= " AND annee >= ?";
    $params[] = $annee_min;
    $types .= 'i';
}

// Préparation de la requête pour éviter les injections SQL
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    http_response_code(500);
    die(json_encode(['success' => false, 'message' => 'Erreur de préparation de la requête.']));
}

// Liaison des paramètres
if (!empty($types)) {
    $stmt->bind_param($types, ...$params);
}

// Exécution de la requête
$stmt->execute();
$resultat = $stmt->get_result();

$voitures = [];
while ($row = $resultat->fetch_assoc()) {
    $voitures[] = $row;
}

// Renvoie les résultats en JSON
echo json_encode(['success' => true, 'data' => $voitures]);

// Fermeture de la connexion et de la requête préparée
$stmt->close();
$conn->close();
