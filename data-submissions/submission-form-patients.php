<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db = new mysqli('localhost', 'root', '', 'dbhospitaladmin');

    if ($db->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
        exit;
    }

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid JSON input.']);
        exit;
    }

    if (isset($data['patient'])) {
        $patient = $data['patient'];
        $stmt = $db->prepare("INSERT INTO patients (clinic_num, first_name, last_name, address, phone_num, gender, date_of_birth, m_status, date_registered) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("isssssss",
            $patient['clinic_num'], $patient['first_name'], $patient['last_name'], $patient['address'],
            $patient['phone_num'], $patient['gender'], $patient['date_of_birth'], $patient['m_status']
        );

        if ($stmt->execute()) {
            $patient_num = $db->insert_id;
            echo json_encode(['success' => true, 'patient_num' => $patient_num]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to insert patient data.']);
        }
        exit;
    }

    if (isset($data['next_of_kin'])) {
        $next_of_kin = $data['next_of_kin'];
        $stmt = $db->prepare("INSERT INTO nextofkin (patient_num, first_name, last_name, address, relationship, phone_num) 
                               VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssss",
            $next_of_kin['patient_num'], $next_of_kin['first_name'], $next_of_kin['last_name'],
            $next_of_kin['address'], $next_of_kin['relationship'], $next_of_kin['phone_num']
        );

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to insert next-of-kin data.']);
        }
        exit;
    }

    if (isset($data['appointment'])) {
        $appointment = $data['appointment'];
        $stmt = $db->prepare("INSERT INTO appointment (patient_num, staff_num, date_of_exam, time_of_exam, exam_room) 
                               VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("iisss",
            $appointment['patient_num'], $appointment['staff_num'], $appointment['date_of_exam'],
            $appointment['time_of_exam'], $appointment['exam_room']
        );

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to insert appointment data.']);
        }
        exit;
    }
}



