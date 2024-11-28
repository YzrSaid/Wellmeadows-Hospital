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
$staff_num = $_POST['staff_num'] ?? null;
$type = $_POST['type'] ?? null;
$date_of_qualification = $_POST['date_of_qualification'] ?? null;
$institute_name = $_POST['institute_name'] ?? null;

// Validate inputs
if (!$staff_num || !$type || !$date_of_qualification || !$institute_name) {
    echo "All fields are required.";
    exit;
}

// Insert data into the database
$sql = "INSERT INTO qualifications (staff_num, type, date_of_qualification, institute_name) 
        VALUES ('$staff_num', '$type', '$date_of_qualification', '$institute_name')";

if ($conn->query($sql) === TRUE) {
    echo "Qualification added successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the connection
$conn->close();

