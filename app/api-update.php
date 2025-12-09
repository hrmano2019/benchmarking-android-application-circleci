<?php
// Définit l'en-tête pour une réponse JSON
header('Content-Type: application/json');

// Inclusion de la connexion à la base de données
require_once '../database.php';

// Vérifie si la requête est de type POST et si les données nécessaires sont présentes
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['id_voiture']) || !isset($_POST['statut'])) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Requête invalide. Données manquantes.']));
}

$id_voiture = $_POST['id_voiture'];
$statut = $_POST['statut'];

// Vérifie que le statut est une valeur valide pour des raisons de sécurité
$statuts_valides = ['disponible', 'vendu', 'reserve'];
if (!in_array($statut, $statuts_valides)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Statut non valide.']));
}

// Requête préparée pour mettre à jour la disponibilité
$sql = "UPDATE voitures SET disponibilite = ? WHERE id = ?";

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    http_response_code(500);
    die(json_encode(['success' => false, 'message' => 'Erreur de préparation de la requête.']));
}

$stmt->bind_param('si', $statut, $id_voiture);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Statut du véhicule mis à jour avec succès.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la mise à jour du statut.']);
}

$stmt->close();
$conn->close();
