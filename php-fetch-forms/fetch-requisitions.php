<?php
// fetch-requisition.php

// Database connection
$db = new mysqli('localhost', 'root', '', 'dbhospitaladmin');

if ($db->connect_error) {
    die("Database connection failed: " . $db->connect_error);
}

// Check the action to fetch appropriate data
if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'getPharmaceuticalSupplies':
            fetchPharmaceuticalSupplies($db);
            break;

        case 'getSurgicalSupplies':
            fetchSurgicalSupplies($db);
            break;

        case 'getNonSurgicalSupplies':
            fetchNonSurgicalSupplies($db);
            break;

        case 'getStaff':
            fetchStaff($db);
            break;

        case 'getWards':
            fetchWards($db);
            break;

        case 'getRequisitions':
            fetchRequisitions($db);
            break;

        case 'getRequisitionItems':
            if (isset($_GET['requisition_id'])) {
                fetchRequisitionItems($db, $_GET['requisition_id']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Requisition ID is required']);
            }
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
            break;
    }
}

// Fetch Pharmaceutical Supplies
function fetchPharmaceuticalSupplies($db)
{
    $query = "SELECT id, drug_name FROM pharmaceutical_supplies";
    $result = $db->query($query);
    $drugs = [];

    while ($row = $result->fetch_assoc()) {
        $drugs[] = $row;
    }

    echo json_encode($drugs);
}

// Fetch Surgical Supplies
function fetchSurgicalSupplies($db)
{
    $query = "SELECT id, item_name FROM surgical_supplies";
    $result = $db->query($query);
    $supplies = [];

    while ($row = $result->fetch_assoc()) {
        $supplies[] = $row;
    }

    echo json_encode($supplies);
}

// Fetch Non-Surgical Supplies
function fetchNonSurgicalSupplies($db)
{
    $query = "SELECT id, item_name FROM non_surgical_supplies";
    $result = $db->query($query);
    $supplies = [];

    while ($row = $result->fetch_assoc()) {
        $supplies[] = $row;
    }

    echo json_encode($supplies);
}

// Fetch Staff
function fetchStaff($db)
{
    $query = "SELECT staff_num, CONCAT(first_name, ' ', last_name) AS name FROM staff";
    $result = $db->query($query);
    $staff = [];

    while ($row = $result->fetch_assoc()) {
        $staff[] = $row;
    }

    echo json_encode($staff);
}

// Fetch Wards
function fetchWards($db)
{
    $query = "SELECT ward_num, ward_name FROM wards";
    $result = $db->query($query);
    $wards = [];

    while ($row = $result->fetch_assoc()) {
        $wards[] = $row;
    }

    echo json_encode($wards);
}

// Fetch Requisitions
function fetchRequisitions($db)
{
    $query = "SELECT r.requisition_id, r.created_at, w.ward_name, s.first_name, s.last_name
              FROM requisitions r
              JOIN wards w ON r.ward_num = w.ward_num
              JOIN staff s ON r.staff_num = s.staff_num";
    $result = $db->query($query);
    $requisitions = [];

    while ($row = $result->fetch_assoc()) {
        $requisitions[] = $row;
    }

    echo json_encode($requisitions);
}

// Fetch Items for a Specific Requisition
function fetchRequisitionItems($db, $requisition_id)
{
    $query = "SELECT ri.quantity, 
                     COALESCE(ps.drug_name, ss.item_name, ns.item_name) AS drug_name
              FROM requisition_items ri
              LEFT JOIN pharmaceutical_supplies ps ON ri.drug_id = ps.id
              LEFT JOIN surgical_supplies ss ON ri.drug_id = ss.id
              LEFT JOIN non_surgical_supplies ns ON ri.drug_id = ns.id
              WHERE ri.requisition_id = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param("i", $requisition_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $items = [];

    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    echo json_encode($items);
}

$db->close();
?>