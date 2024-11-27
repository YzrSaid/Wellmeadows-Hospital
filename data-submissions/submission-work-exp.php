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

    // Insert new work experience
    if (isset($data['work_experience'])) {
        $workExperience = $data['work_experience'];

        $stmt = $db->prepare(
            "INSERT INTO workexperience (staff_num, name_of_org, position, start_date, end_date) 
             VALUES (?, ?, ?, ?, ?)"
        );

        $stmt->bind_param(
            "issss",
            $workExperience['staff_num'],
            $workExperience['name_of_org'],
            $workExperience['position'],
            $workExperience['start_date'],
            $workExperience['end_date']
        );

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Work experience added successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add work experience.']);
        }

        exit;
    }

    // Fetch all work experiences
    if (isset($data['action']) && $data['action'] === 'fetch') {
        $query = "SELECT * FROM workexperience ORDER BY experience_id DESC";
        $result = $db->query($query);

        if ($result) {
            $experiences = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode(['success' => true, 'data' => $experiences]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to fetch work experiences.']);
        }

        exit;
    }

    // Search and sort functionality
    if (isset($data['action']) && $data['action'] === 'search_sort') {
        $searchTerm = $db->real_escape_string($data['searchTerm'] ?? '');
        $sortColumn = $db->real_escape_string($data['sortColumn'] ?? 'experience_id');

        $query = "SELECT * FROM workexperience WHERE 
                  name_of_org LIKE '%$searchTerm%' OR 
                  position LIKE '%$searchTerm%' 
                  ORDER BY $sortColumn ASC";

        $result = $db->query($query);

        if ($result) {
            $experiences = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode(['success' => true, 'data' => $experiences]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Search or sort failed.']);
        }

        exit;
    }

    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}
