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

// Log received data for debugging
error_log('Received data: ' . print_r($data, true));

// Validate incoming data
if (!$data || !isset($data['items']) || empty($data['items']) || !isset($data['staff_num']) || !isset($data['ward_num'])) {
    error_log('Invalid data received: ' . print_r($data, true));
    echo json_encode(['success' => false, 'message' => 'Invalid data received.']);
    exit;
}

$items = $data['items'];  // List of items
$staff_num = $data['staff_num'];  // Staff number
$ward_num = $data['ward_num'];  // Ward number

error_log("Staff Num: $staff_num, Ward Num: $ward_num");

// Insert requisition into the requisitions table
$query = "INSERT INTO requisitions (staff_num, ward_num, created_at) VALUES ('$staff_num', '$ward_num', NOW())";
if ($db->query($query) === TRUE) {
    $requisition_id = $db->insert_id;  // Get the inserted requisition ID
    error_log("Requisition created with ID: " . $requisition_id);

    // Process each item in the requisition
    foreach ($items as $item) {
        // Extract drug name and quantity from the item
        list($drug_name, $quantity) = explode(" - ", $item);
        $drug_name = trim($drug_name);  // Trim any whitespace
        $quantity = trim($quantity);    // Trim any whitespace

        error_log("Processing item: " . $drug_name . " - " . $quantity);

        // Attempt to find the drug in the pharmaceutical, surgical, or non-surgical supplies
        $drug_id = null;
        $result = $db->query("SELECT id FROM pharmaceutical_supplies WHERE drug_name = '$drug_name'");

        if ($result->num_rows > 0) {
            $drug = $result->fetch_assoc();
            $drug_id = $drug['id'];
            error_log("Found pharmaceutical supply with ID: " . $drug_id);
        } else {
            $result = $db->query("SELECT id FROM surgical_supplies WHERE item_name = '$drug_name'");
            if ($result->num_rows > 0) {
                $drug = $result->fetch_assoc();
                $drug_id = $drug['id'];
                error_log("Found surgical supply with ID: " . $drug_id);
            } else {
                $result = $db->query("SELECT id FROM non_surgical_supplies WHERE item_name = '$drug_name'");
                if ($result->num_rows > 0) {
                    $drug = $result->fetch_assoc();
                    $drug_id = $drug['id'];
                    error_log("Found non-surgical supply with ID: " . $drug_id);
                } else {
                    // If the item is not found in any table, log and continue
                    error_log("Item not found: " . $drug_name);
                    continue;  // Skip this item
                }
            }
        }

        // If a valid drug_id is found, insert the item into requisition_items
        if ($drug_id !== null) {
            $query_item = "INSERT INTO requisition_items (requisition_id, drug_id, quantity) 
                           VALUES ('$requisition_id', '$drug_id', '$quantity')";
            if ($db->query($query_item)) {
                error_log("Inserted item: " . $drug_name . " - " . $quantity);
            } else {
                error_log("Error inserting item: " . $db->error);
            }
        }
    }

    // Send success response
    echo json_encode(['success' => true, 'message' => 'Requisition submitted successfully!']);
} else {
    // Log and send error message if requisition insertion failed
    error_log("Error creating requisition: " . $db->error);
    echo json_encode(['success' => false, 'message' => 'Error: ' . $db->error]);
}

// Close database connection
$db->close();
?>