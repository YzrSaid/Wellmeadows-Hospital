<?php
// Check if the POST request contains patient data
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['patient_num'])) {
    $patient_num = $data['patient_num'];
    $first_name = $data['first_name'];
    $last_name = $data['last_name'];
    $address = $data['address'];
    $phone_num = $data['phone_num'];
    $gender = $data['gender'];
    $date_of_birth = $data['date_of_birth'];
    $m_status = $data['m_status'];
    $date_registered = $data['date_registered'];

    // Database connection
    $db = new mysqli('localhost', 'root', '', 'dbhospitaladmin');

    if ($db->connect_error) {
        die("Database connection failed: " . $db->connect_error);
    }

    // Update the patient information in the database
    $sql_update = "UPDATE patients SET 
                    first_name = ?, 
                    last_name = ?, 
                    address = ?, 
                    phone_num = ?, 
                    gender = ?, 
                    date_of_birth = ?, 
                    m_status = ?, 
                    date_registered = ? 
                    WHERE patient_num = ?";

    $stmt = $db->prepare($sql_update);
    $stmt->bind_param('ssssssssi', $first_name, $last_name, $address, $phone_num, $gender, $date_of_birth, $m_status, $date_registered, $patient_num);

    if ($stmt->execute()) {
        $response = ['success' => true];
    } else {
        $response = ['success' => false, 'message' => 'Failed to update patient data.'];
    }

    // Output the response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);

    // Close the database connection
    $stmt->close();
    $db->close();
} else {
    // If patient_num is not provided in the request
    http_response_code(400);
    echo json_encode(['error' => 'Patient number is required']);
}
?>
