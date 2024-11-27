<?php
// fetch_patients.php

// Connect to the database
$db = new mysqli('localhost', 'root', '', 'dbhospitaladmin');

if ($db->connect_error) {
    die("Database connection failed: " . $db->connect_error);
}

// Fetch patients from the database
$sql = "SELECT patients.clinic_num, CONCAT(patients.first_name, ' ', patients.last_name) AS full_name, 
               patients.gender, patients.address, patients.m_status, patients.phone_num, patients.date_of_birth, 
               patients.date_registered, 
               CONCAT(nextofkin.first_name, ' ', nextofkin.last_name) AS next_of_kin_name, 
               nextofkin.relationship, nextofkin.phone_num AS next_of_kin_phone
        FROM patients
        LEFT JOIN nextofkin AS nextofkin ON patients.clinic_num = nextofkin.patient_num";  

$result = $db->query($sql);

$patients = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }
}

// Output the data as JSON
echo json_encode($patients);

