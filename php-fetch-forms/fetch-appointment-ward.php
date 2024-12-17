<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbhospitaladmin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed.", "error" => $conn->connect_error]));
}

// Fetch wards from the wards table
$sql = "SELECT ward_num, ward_name FROM wards";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $wards = [];
    while ($row = $result->fetch_assoc()) {
        $wards[] = $row;
    }
    echo json_encode($wards);
} else {
    echo json_encode([]);
}

$conn->close();
?>
