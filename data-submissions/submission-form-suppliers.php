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
$supplier_name = $_POST['supplier_name'] ?? null;
$supplier_address = $_POST['supplier_address'] ?? null;
$supplier_email = $_POST['supplier_email'] ?? null;
$supplier_tel_num = $_POST['supplier_tel_num'] ?? null;
$supplier_fax_num = $_POST['supplier_fax_num'] ?? null;

// Validate inputs
if (!$supplier_name || !$supplier_address || !$supplier_email || !$supplier_tel_num) {
    echo "All required fields must be filled.";
    exit;
}

if (!filter_var($supplier_email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format.";
    exit;
}

// Insert data into the database
$sql = "INSERT INTO suppliers (name, address, email, tel_num, fax_num) 
        VALUES ('$supplier_name', '$supplier_address', '$supplier_email', '$supplier_tel_num', '$supplier_fax_num')";

if ($conn->query($sql) === TRUE) {
    echo "Supplier added successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>
