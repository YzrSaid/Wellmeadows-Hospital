<?php
// Enable error reporting (for debugging purposes)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set the content type to JSON
header('Content-Type: application/json');

// Database connection details
$host = 'localhost';
$dbname = 'dbhospitaladmin';
$username = 'root';
$password = '';

try {
    // Create a PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch pharmaceutical supplies data
    $query = $pdo->query("SELECT drug_num, drug_name FROM pharmaceutical_supplies");
    $supplies = $query->fetchAll(PDO::FETCH_ASSOC);

    // Fetch patient data
    $patientQuery = $pdo->query("SELECT patient_num, CONCAT(first_name, ' ', last_name) AS name FROM patients");
    $patients = $patientQuery->fetchAll(PDO::FETCH_ASSOC);

    // Return the data as JSON
    echo json_encode([
        'patients' => $patients,
        'supplies' => $supplies
    ]);
} catch (PDOException $e) {
    // Return an error message in JSON format if a database error occurs
    echo json_encode(['error' => $e->getMessage()]);
}
?>
