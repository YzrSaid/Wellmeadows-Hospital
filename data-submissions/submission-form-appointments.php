<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbhospitaladmin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed.", "error" => $conn->connect_error]));
}

// Decode incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Validate received data
if (!$data || !isset($data["type"])) {
    echo json_encode(["message" => "Invalid request data."]);
    exit;
}

$type = $data["type"];
$stmt = null;

// Handle Out-Patient
if ($type === "Out-Patient") {
    $patientNum = $data["patient_num"];
    $dateOfAppt = $data["date_of_appt"];
    $timeOfAppt = $data["time_of_appt"];

    // Validate required fields
    if (!$patientNum || !$dateOfAppt || !$timeOfAppt) {
        echo json_encode(["message" => "Missing required fields for Out-Patient."]);
        exit;
    }

    $sql = "INSERT INTO outpatients (patient_num, time_of_appt, date_of_appt) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iss", $patientNum, $timeOfAppt, $dateOfAppt);

} 
// Handle In-Patient
else if ($type === "In-Patient") {
    $patientNum = $data["patient_num"];
    $wardNum = $data["ward_num"];
    $waitingListDate = $data["waiting_list_date"];
    $expectedStay = $data["expected_stay"];
    $dateAdmitted = $data["date_admitted"];
    $dateExpectedLeave = $data["date_expected_leave"];
    $bedNum = $data["bed_num"];

    // Validate required fields
    if (!$patientNum || !$wardNum || !$waitingListDate || !$expectedStay || !$dateAdmitted || !$dateExpectedLeave || !$bedNum) {
        echo json_encode(["message" => "Missing required fields for In-Patient."]);
        exit;
    }

    $sql = "INSERT INTO inpatients (patient_num, ward_num, waiting_list_date, expected_stay, date_admitted, date_expected_leave, bed_num) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("issssss", $patientNum, $wardNum, $waitingListDate, $expectedStay, $dateAdmitted, $dateExpectedLeave, $bedNum);
} 
else {
    echo json_encode(["message" => "Invalid appointment type."]);
    exit;
}

// Execute the query and handle response
if ($stmt->execute()) {
    echo json_encode(["message" => "Appointment conducted successfully!"]);
} else {
    echo json_encode(["message" => "Failed to conduct appointment.", "error" => $stmt->error]);
}

// Close connection
$stmt->close();
$conn->close();
?>
