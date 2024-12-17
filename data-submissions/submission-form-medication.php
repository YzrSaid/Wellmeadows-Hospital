<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'dbhospitaladmin';
$username = 'root';
$password = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get POST data
    $patient_num = $_POST['patient_num'];
    $drug_num = $_POST['drug_num'];
    $units_per_day = $_POST['units_per_day'];  // This now reflects method_of_admin
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];

    try {
        // Database connection
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Insert medication information into the database
        $stmt = $pdo->prepare("
            INSERT INTO medications (patient_num, drug_num, method_of_admin, start_date, end_date)
            VALUES (:patient_num, :drug_num, :method_of_admin, :start_date, :end_date)
        ");
        $stmt->bindParam(':patient_num', $patient_num);
        $stmt->bindParam(':drug_num', $drug_num);
        $stmt->bindParam(':method_of_admin', $units_per_day);  // Store units_per_day as method_of_admin
        $stmt->bindParam(':start_date', $start_date);
        $stmt->bindParam(':end_date', $end_date);

        $stmt->execute();

        // Return success response
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
?>
