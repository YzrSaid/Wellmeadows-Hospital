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

// Default query
$query = "SELECT * FROM suppliers";

// Check for search query
if (!empty($_GET['search'])) {
    $search = $conn->real_escape_string($_GET['search']);
    $query .= " WHERE name LIKE '%$search%' 
                OR address LIKE '%$search%' 
                OR email LIKE '%$search%' 
                OR tel_num LIKE '%$search%' 
                OR fax_num LIKE '%$search%'";
}

// Check for sort option
if (!empty($_GET['sort'])) {
    $sortColumn = '';
    switch ($_GET['sort']) {
        case 'supplier-number':
            $sortColumn = 'supplier_num';
            break;
        case 'supplier-name':
            $sortColumn = 'name';
            break;
        case 'supplier-address':
            $sortColumn = 'address';
            break;
        case 'supplier-email':
            $sortColumn = 'email';
            break;
        case 'supplier-tel-num':
            $sortColumn = 'tel_num';
            break;
        case 'supplier-fax-num':
            $sortColumn = 'fax_num';
            break;
    }

    if ($sortColumn) {
        $query .= " ORDER BY $sortColumn";
    }
}

// Execute query
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Generate table rows
    while ($row = $result->fetch_assoc()) {
        echo "
            <tr>
                <td>{$row['supplier_num']}</td>
                <td>{$row['name']}</td>
                <td>{$row['address']}</td>
                <td>{$row['email']}</td>
                <td>{$row['tel_num']}</td>
                <td>{$row['fax_num']}</td>
            </tr>
        ";
    }
} else {
    echo "<tr><td colspan='6'>No suppliers found.</td></tr>";
}

$conn->close();
?>
