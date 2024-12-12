<?php
// Database connection (update credentials as needed)
$servername = "localhost";
$username = "root";
$password = "";
$database = "dbhospitaladmin";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to fetch doctor data
$sql = "SELECT clinic_num, first_name, last_name, address, phone_num FROM localdoctors";
$result = $conn->query($sql);

$doctors = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $doctors[] = $row;
    }
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($doctors);

// Close connection
$conn->close();
?>
