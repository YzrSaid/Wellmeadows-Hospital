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

// Check if drug number is provided
if (isset($_GET['drug_num'])) {
    $drug_num = $_GET['drug_num'];

    try {
        // Create a PDO instance
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Fetch method_of_admin and drug_name based on drug_num from pharmaceutical_supplies table
        $stmt = $pdo->prepare("SELECT method_of_admin, drug_name FROM pharmaceutical_supplies WHERE drug_num = :drug_num");
        $stmt->bindParam(':drug_num', $drug_num);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode([
                'method_of_admin' => $result['method_of_admin'],  // Method of administration
                'drug_name' => $result['drug_name']  // Drug name
            ]);
        } else {
            echo json_encode(['error' => 'Method of administration or drug not found.']);
        }
    } catch (PDOException $e) {
        // Return an error message in JSON format if a database error occurs
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    // No drug number provided
    echo json_encode(['error' => 'No drug number provided.']);
}
?>
