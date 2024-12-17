<?php
session_start(); 
$servername = "localhost";
$username = "root";        
$password = "";             
$dbname = "dbhospitaladmin";    

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form input values
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Query to check if the user exists
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username); // Bind the username parameter
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the user exists
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verify the password (hash comparison)
        if (password_verify($password, $user['password'])) {
            // Password is correct, start a session and redirect to the dashboard
            $_SESSION['username'] = $username;
            $_SESSION['user_id'] = $user['id'];  
            header("Location: homepage.php");  
            exit();
        } else {
            // Password is incorrect
            $error = "Invalid username or password.";
        }
    } else {
        // User doesn't exist
        $error = "Invalid username or password.";
    }

    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wellmeadow's Hospital</title>
    <link rel="stylesheet" href="../css/styles.css?=v2">
</head>
<body>
    <div class="login-wrapper">
        <div class="logo-container">
            <div class="logo-s">
                <img src="../images/logo.jpg" alt="logo-icon">
            </div>
        </div>
        <h1 id="login-title">Wellmeadow's Hospital</h1>

        <div class="container">
            <div class="login-container">
                <form action="login.php" method="post" class="login-form">
                    <label for="username">Username</label>
                    <input id="username" class="inner-input" type="text" name="username" required />
                    
                    <label for="password">Password</label>
                    <input id="password" class="inner-input" type="password" name="password" required />

                    <!-- Display error message if login fails -->
                    <?php if (isset($error)): ?>
                        <p style="color: red;"><?php echo $error; ?></p>
                    <?php endif; ?>

                    <button type="submit" name="Submit" class="login-btn">Log In</button>
                </form>
            </div>
            
        </div>
    </div>
</body>
</html>
