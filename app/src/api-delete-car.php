<?php
// Définit l'en-tête pour une réponse JSON
header('Content-Type: application/json');

// Inclusion de la connexion à la base de données
require_once '../database.php';

// Vérifie si la requête est de type POST et si l'ID est présent
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['id_voiture'])) {
    http_response_code(400); // Bad Request
    die(json_encode(['success' => false, 'message' => 'Requête invalide ou ID manquant.']));
}

$id_voiture = $_POST['id_voiture'];

// Requête préparée pour supprimer la voiture
$sql = "DELETE FROM voitures WHERE id = ?";

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    http_response_code(500); // Internal Server Error
    die(json_encode(['success' => false, 'message' => 'Erreur de préparation de la requête.']));
}

$stmt->bind_param('i', $id_voiture);

if ($stmt->execute()) {
    // Vérifie si une ligne a bien été affectée (si la voiture a été trouvée et supprimée)
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'Véhicule supprimé avec succès.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Aucun véhicule trouvé avec cet ID.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la suppression du véhicule.']);
}

$stmt->close();
$conn->close();
