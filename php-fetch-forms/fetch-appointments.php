<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbhospitaladmin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Determine the action
$action = isset($_GET['action']) ? $_GET['action'] : null;

if ($action === 'getUpcomingAppointments') {
    // Fetch upcoming appointments for the dropdown
    $sql = "SELECT 
                p.patient_num,
                CONCAT(p.first_name, ' ', p.last_name, ' - ', a.date_of_exam, ' ', a.time_of_exam) AS full_details
            FROM patients p
            INNER JOIN appointment a ON p.patient_num = a.patient_num";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo json_encode(["error" => "No upcoming appointments found."]);
    }
} elseif ($action === 'getAppointmentInfo') {
    // Fetch specific appointment details
    $patient_num = isset($_GET['patient_num']) ? $_GET['patient_num'] : null;
    if (!$patient_num) {
        echo json_encode(["error" => "Patient number is required."]);
        exit;
    }

    $sql = "SELECT 
                CONCAT(p.first_name, ' ', p.last_name) AS name,
                a.appointment_id,
                a.exam_room,
                a.date_of_exam,
                a.time_of_exam,
                a.staff_num
            FROM patients p
            INNER JOIN appointment a ON p.patient_num = a.patient_num
            WHERE p.patient_num = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $patient_num);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $data = $result->fetch_assoc()) {
        echo json_encode($data);
    } else {
        echo json_encode(["error" => "No appointment found for the specified patient."]);
    }
} else {
    echo json_encode(["error" => "Invalid action."]);
}

$conn->close();
?>



