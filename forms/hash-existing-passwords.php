<?php
$servername = "localhost";
$username = "root";        
$password = "";             
$dbname = "dbhospitaladmin";    

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to select all users
$sql = "SELECT id, password FROM users";
$result = $conn->query($sql);

// Check if users exist
if ($result->num_rows > 0) {
    // Loop through each user and hash the password
    while ($row = $result->fetch_assoc()) {
        $hashedPassword = password_hash($row['password'], PASSWORD_DEFAULT);  // Hash the password
        $userId = $row['id'];

        // Update the password in the database
        $updateSql = "UPDATE users SET password = ? WHERE id = ?";
        $stmt = $conn->prepare($updateSql);
        $stmt->bind_param("si", $hashedPassword, $userId);
        $stmt->execute();
    }
    echo "Passwords updated successfully!";
} else {
    echo "No users found.";
}

$conn->close();
?>
