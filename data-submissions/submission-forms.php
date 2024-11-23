<?php
include_once '../components/dbconnection.php';

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read and decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    if ($input) {
        // Sanitize and retrieve form data
        $firstName = mysqli_real_escape_string($connection, $input['patient_first_name'] ?? '');
        $lastName = mysqli_real_escape_string($connection, $input['patient_last_name'] ?? '');
        $street = mysqli_real_escape_string($connection, $input['patient_street'] ?? '');
        $city = mysqli_real_escape_string($connection, $input['patient_city'] ?? '');
        $country = mysqli_real_escape_string($connection, $input['patient_country'] ?? '');
        $phoneNum = mysqli_real_escape_string($connection, $input['patient_phone_num'] ?? '');
        $gender = mysqli_real_escape_string($connection, $input['patient_gender'] ?? '');
        $dob = mysqli_real_escape_string($connection, $input['patient_date_of_birth'] ?? '');
        $mStatus = mysqli_real_escape_string($connection, $input['patient_m_status'] ?? '');
        $clinicNum = mysqli_real_escape_string($connection, $input['patient_clinic_num'] ?? '');

        // Insert the data into the database
        $query = "INSERT INTO patients (clinic_num, first_name, last_name, street, city, country, phone_num, gender, date_of_birth, m_status)
                  VALUES ('$clinicNum', '$firstName', '$lastName', '$street', '$city', '$country', '$phoneNum', '$gender', '$dob', '$mStatus')";

        if (mysqli_query($connection, $query)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Database insertion failed: ' . mysqli_error($connection)]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}

// Close the database connection
mysqli_close($connection);
?>
