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

// Get search and sort inputs
$search = $_GET['search'] ?? '';
$sort = $_GET['sort'] ?? '';

// Base query
$sql = "SELECT * FROM qualifications WHERE 
        staff_num LIKE '%$search%' OR 
        type LIKE '%$search%' OR 
        date_of_qualification LIKE '%$search%' OR 
        institute_name LIKE '%$search%'";

// Add sorting if applicable
if ($sort) {
    switch ($sort) {
        case 'ID':
            $sql .= " ORDER BY qualification_id";
            break;
        case 'Staff Number':
            $sql .= " ORDER BY staff_num";
            break;
        case 'staff-type':
            $sql .= " ORDER BY type";
            break;
        case 'qualification-date':
            $sql .= " ORDER BY date_of_qualification";
            break;
        case 'institute-name':
            $sql .= " ORDER BY institute_name";
            break;
    }
}

// Execute query
$result = $conn->query($sql);

// Generate HTML for the table rows
$output = '';
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $output .= '<tr>
                        <td>' . $row['qualification_id'] . '</td>
                        <td>' . $row['staff_num'] . '</td>
                        <td>' . $row['type'] . '</td>
                        <td>' . $row['date_of_qualification'] . '</td>
                        <td>' . $row['institute_name'] . '</td>
                    </tr>';
    }
} else {
    $output .= '<tr><td colspan="5">No qualifications found.</td></tr>';
}

echo $output;

$conn->close();
?>
