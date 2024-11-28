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

// Determine the action
$action = $_REQUEST['action'] ?? '';

if ($action == 'fetch') {
    // Fetch Wards Data
    $sort = $_GET['sort'] ?? '';
    $search = $_GET['search'] ?? '';

    // Build query
    $query = "SELECT * FROM wards WHERE 1";

    if ($search) {
        $query .= " AND (ward_name LIKE '%$search%' OR location LIKE '%$search%' OR num_of_beds LIKE '%$search%' OR phone_ext_num LIKE '%$search%')";
    }

    if ($sort) {
        switch ($sort) {
            case 'ward-number':
                $query .= " ORDER BY ward_num";
                break;
            case 'ward-name':
                $query .= " ORDER BY ward_name";
                break;
            case 'ward-address':
                $query .= " ORDER BY location";
                break;
            case 'ward-email':
                $query .= " ORDER BY num_of_beds";
                break;
            case 'ward-tel-num':
                $query .= " ORDER BY phone_ext_num";
                break;
        }
    }

    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "
            <tr>
                <td>{$row['ward_num']}</td>
                <td>{$row['ward_name']}</td>
                <td>{$row['location']}</td>
                <td>{$row['num_of_beds']}</td>
                <td>{$row['phone_ext_num']}</td>
                <td><button class='edit-btn' data-ward-num='{$row['ward_num']}'>Edit</button></td>
            </tr>
            ";
        }
    } else {
        echo "<tr><td colspan='6'>No wards found.</td></tr>";
    }

} elseif ($action == 'get_details') {
    // Get Ward Details
    $ward_num = $_GET['ward_num'] ?? '';

    $query = "SELECT * FROM wards WHERE ward_num = '$ward_num'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode([]);
    }

} elseif ($action == 'update') {
    // Update Ward
    $ward_num = $_POST['ward_num'];
    $ward_name = $_POST['ward_name'];
    $ward_location = $_POST['ward_location'];
    $num_of_beds = $_POST['num_of_beds'];
    $phone_ext_num = $_POST['phone_ext_num'];

    $query = "UPDATE wards 
              SET ward_name = '$ward_name', location = '$ward_location', num_of_beds = '$num_of_beds', phone_ext_num = '$phone_ext_num'
              WHERE ward_num = '$ward_num'";

    if ($conn->query($query) === TRUE) {
        echo "Ward updated successfully.";
    } else {
        echo "Error updating ward: " . $conn->error;
    }

} else {
    echo "Invalid action.";
}

$conn->close();
