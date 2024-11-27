<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db = new mysqli('localhost', 'root', '', 'dbhospitaladmin');

    if ($db->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
        exit;
    }

    // Get JSON data from request body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid JSON input.']);
        exit;
    }

    // Insert staff information
    if (isset($data['staff'])) {
        $staff = $data['staff'];
        $stmt1 = $db->prepare(
            "INSERT INTO staff (ward_num, first_name, last_name, address, gender, date_of_birth, phone_num, insurance_num, position, current_salary, salary_scale) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        );

        $stmt1->bind_param(
            "issssssssdd",
            $staff['ward_num'], // Added ward_num
            $staff['first_name'],
            $staff['last_name'],
            $staff['address'],
            $staff['gender'],
            $staff['date_of_birth'],
            $staff['phone_num'],
            $staff['insurance_num'],
            $staff['position'],
            $staff['current_salary'],
            $staff['salary_scale']
        );

        if ($stmt1->execute()) {
            $staff_num = $db->insert_id; // Get last inserted ID

            // Insert contract information
            $stmt2 = $db->prepare(
                "INSERT INTO contract (staff_num, num_of_hours, contract_type, type_of_salary) 
                 VALUES (?, ?, ?, ?)"
            );

            $stmt2->bind_param(
                "iiss",
                $staff_num,
                $staff['num_of_hours'],
                $staff['contract_type'],
                $staff['type_of_salary']
            );

            if ($stmt2->execute()) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to insert contract data.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to insert staff data.']);
        }
        exit;
    }

    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}
