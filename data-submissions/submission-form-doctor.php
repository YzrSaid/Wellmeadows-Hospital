<?php
// Database connection (update with your credentials)
$servername = "localhost";
$username = "root";
$password = "";
$database = "dbhospitaladmin";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from AJAX request
$first_name = $_POST['first_name'] ?? null;
$last_name = $_POST['last_name'] ?? null;
$address = $_POST['address'] ?? null;
$phone = $_POST['phone'] ?? null;

// Validate inputs
if (!$first_name || !$last_name || !$address || !$phone) {
    echo "All required fields must be filled.";
    exit;
}

// Insert data into the database
$sql = "INSERT INTO localdoctors (clinic_num, first_name, last_name, address, phone_num) 
        VALUES (NULL, '$first_name', '$last_name', '$address', '$phone')";

if ($conn->query($sql) === TRUE) {
    echo "Doctor added successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>