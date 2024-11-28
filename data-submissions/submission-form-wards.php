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
$ward_name = $_POST['ward_name'] ?? null;
$ward_location = $_POST['ward_location'] ?? null;
$total_beds = $_POST['total_beds'] ?? null;
$tel_extension = $_POST['tel_extension'] ?? null;

// Validate inputs
if (!$ward_name || !$ward_location || !$total_beds || !$tel_extension) {
    echo "All fields are required.";
    exit;
}

// Insert data into the database
$sql = "INSERT INTO wards (ward_name, location, num_of_beds, phone_ext_num) 
        VALUES ('$ward_name', '$ward_location', '$total_beds', '$tel_extension')";

if ($conn->query($sql) === TRUE) {
    echo "Ward added successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();

