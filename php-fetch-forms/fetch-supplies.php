<?php
// Database connection
$db = new mysqli('localhost', 'root', '', 'dbhospitaladmin');

if ($db->connect_error) {
    error_log("Database connection failed: " . $db->connect_error);
    die("Database connection failed: " . $db->connect_error);
}

// Get supply type and sort column from query parameters
$type = $_GET['type'] ?? '';
$sortBy = $_GET['sort'] ?? '';

// Determine which table to query
$table = '';
switch ($type) {
    case 'pharmaceutical':
        $table = 'pharmaceutical_supplies';
        break;
    case 'surgical':
        $table = 'surgical_supplies';
        break;
    case 'non-surgical':
        $table = 'non_surgical_supplies';
        break;
    default:
        echo json_encode([]);
        exit;
}

// Default query
$query = "SELECT * FROM $table";

// Apply sorting if a sort column is provided
if ($sortBy) {
    $query .= " ORDER BY $sortBy";
}

$result = $db->query($query);

$supplies = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $supplies[] = $row;
    }
}

echo json_encode($supplies);
$db->close();
?>
