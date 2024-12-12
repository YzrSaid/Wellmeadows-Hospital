<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection
$db = new mysqli('localhost', 'root', '', 'dbhospitaladmin');

if ($db->connect_error) {
    error_log("Database connection failed: " . $db->connect_error);
    die("Database connection failed: " . $db->connect_error);
}

// Get raw POST data
$data = json_decode(file_get_contents('php://input'), true);
error_log('Received data: ' . print_r($data, true));

if (!$data || !isset($data['supply']) || empty($data['supply'])) {
    error_log('Invalid data received: ' . print_r($data, true));
    echo json_encode(['success' => false, 'message' => 'Invalid data received.']);
    exit;
}

$supply = $data['supply'];
$type = $supply['type'] ?? null;
$drug_name = $supply['drug_name'] ?? null;
$item_name = $supply['item_name'] ?? null;
$quantity_stock = $supply['quantity_stock'] ?? null;
$reorder_level = $supply['reorder_level'] ?? null;
$cost_per_unit = $supply['cost_per_unit'] ?? null;
$description = $supply['description'] ?? null;
$method_admin = $supply['method_admin'] ?? null;

// Insert supply into the database based on type
if ($type === 'pharmaceutical' && $drug_name) {
    $query = "INSERT INTO pharmaceutical_supplies (drug_name, dosage, quantity_stock, reorder_level, cost_per_unit, description, method_of_admin) 
              VALUES ('$drug_name', '$supply[dosage]', '$quantity_stock', '$reorder_level', '$cost_per_unit', '$description', '$method_admin')";
} elseif ($type === 'non-surgical' && $item_name) {
    $query = "INSERT INTO non_surgical_supplies (item_name, quantity_stock, reorder_level, cost_per_unit, description) 
              VALUES ('$item_name', '$quantity_stock', '$reorder_level', '$cost_per_unit', '$description')";
} elseif ($type === 'surgical' && $item_name) {
    $query = "INSERT INTO surgical_supplies (item_name, quantity_stock, reorder_level, cost_per_unit, description) 
              VALUES ('$item_name', '$quantity_stock', '$reorder_level', '$cost_per_unit', '$description')";
} else {
    error_log('Invalid supply type or missing name.');
    echo json_encode(['success' => false, 'message' => 'Invalid supply type or missing name.']);
    exit;
}

if ($db->query($query) === TRUE) {
    error_log("Supply added successfully: " . $db->insert_id);
    echo json_encode(['success' => true, 'message' => 'Supply added successfully!']);
} else {
    error_log("Error adding supply: " . $db->error);
    echo json_encode(['success' => false, 'message' => 'Error: ' . $db->error]);
}

$db->close();
?>