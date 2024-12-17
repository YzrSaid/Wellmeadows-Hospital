<?php

// Database connection
$db = new mysqli('localhost', 'root', '', 'dbhospitaladmin');

if ($db->connect_error) {
    die(json_encode(['error' => "Database connection failed: " . $db->connect_error]));
}

// If a patient number is provided, fetch specific patient details
if (isset($_GET['patient_num'])) {
    // Sanitize and validate patient_num
    $patient_num = intval($_GET['patient_num']); // Ensure it's an integer

    // Fetch patient data from the patients table
    $sql_patient = "SELECT * FROM patients WHERE patient_num = ?";
    $stmt_patient = $db->prepare($sql_patient);

    if ($stmt_patient) {
        $stmt_patient->bind_param('i', $patient_num);
        $stmt_patient->execute();
        $result_patient = $stmt_patient->get_result();
        $patient_data = $result_patient->fetch_assoc();
        $stmt_patient->close();
    } else {
        echo json_encode(['error' => 'Failed to prepare patient query.']);
        exit;
    }

    // Fetch next-of-kin data from the nextofkin table
    $sql_nextofkin = "SELECT * FROM nextofkin WHERE patient_num = ?";
    $stmt_nextofkin = $db->prepare($sql_nextofkin);

    if ($stmt_nextofkin) {
        $stmt_nextofkin->bind_param('i', $patient_num);
        $stmt_nextofkin->execute();
        $result_nextofkin = $stmt_nextofkin->get_result();
        $nextofkin_data = $result_nextofkin->fetch_assoc();
        $stmt_nextofkin->close();
    } else {
        echo json_encode(['error' => 'Failed to prepare next-of-kin query.']);
        exit;
    }

    // Combine patient and next-of-kin data into one response
    if ($patient_data) {
        $response = [
            'patient' => $patient_data,
            'next_of_kin' => $nextofkin_data ?: null // Null if next-of-kin data is not found
        ];

        // Log the response for debugging
        error_log(json_encode($response)); // Log the response for debugging

        // Output the data as JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // If no patient data is found
        http_response_code(404);
        echo json_encode(['error' => 'Patient not found.']);
    }
} else {
    // If no patient_num is provided, fetch all patient data for the search and sort functionality
    $patients = [];
    $sql = "SELECT * FROM patients";
    $result = $db->query($sql);

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $patients[] = $row;
        }
        // Output all patient data as JSON
        header('Content-Type: application/json');
        echo json_encode($patients);
    } else {
        echo json_encode(['error' => 'Failed to fetch patient data.']);
    }
}

// Close the database connection
$db->close();
?>





