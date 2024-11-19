<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wellmeadows Hospital</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body>
    <!-- Nav bar component -->
    <?php include '../components/navbar.php'; ?>

    <div class="wrapper">
        <div class="container">
            <h1>Add a Supplier</h1>
            <section class="add-new-patient-section">
                <div class="accordion">
                    <div class="accordion-item">
                        <button class="accordion-header">Supplier Information</button>
                        <div class="accordion-content"> <br>
                            <h4>Supplier Details</h4> <br>
                            <!-- Supplier Name and Supplier Email -->
                            <div class="content-container" style="width: 80%;">
                                <!-- Supplier Name -->
                                <div class="column">
                                    <div class="row">
                                        <label for="supplier_name">Supplier Name</label>
                                        <input type="text" id="supplier_name">
                                    </div>
                                </div>

                                <!-- Supplier Email -->
                                <div class="column">
                                    <div class="row">
                                        <label for="supplier-email">Supplier Email</label>
                                        <input type="date" id="supplier-email">
                                    </div>
                                </div>
                            </div>

                            <!-- Supplier Address -->
                            <div class="content-container">
                                <div class="column" style="width: 1800px;">
                                    <div class="row">
                                        <label for="supplier-addr">Supplier Address</label>
                                    </div>
                                    <div class="row">
                                        <input type="text" id="supplier-street" style="width: 220px;">
                                        <input type="text" id="supplier-barangay" style="width: 220px;">
                                        <input type="text" id="supplier-city" style="width: 220px;">
                                        <input type="text" id="supplier-country" style="width: 220px;">
                                    </div>
                                    <div class="row" style="width: 100%; margin-left: 0px; margin-top: -10px;">
                                        <label for="supplier-street/purok" style="font-size: 12px; font-weight: normal; margin-left: 65px">Street/Purok</label>
                                        <label for="supplier-barangay" style="font-size: 12px; font-weight: normal; margin-left: -10px;">Barangay</label>
                                        <label for="supplier-city" style="font-size: 12px; font-weight: normal; margin-right: 20px;">City</label>
                                        <label for="supplier-country" style="font-size: 12px; font-weight: normal; margin-right: 80px;">Country</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Supplier Tel. Num and Supplier Fax Num -->
                            <div class="content-container" style="width: 80%;">
                                <!-- Supplier Tel. Num -->
                                <div class="column">
                                    <div class="row">
                                        <label for="supplier-tel-num">Tel. Number</label>
                                        <input type="tel" id="supplier-tel-num">
                                    </div>
                                </div>

                                <!-- Supplier Fax Num -->
                                <div class="column">
                                    <div class="row">
                                        <label for="supplier-fax-num">Fax Number</label>
                                        <input type="number" id="supplier-fax-num">
                                    </div>
                                </div>
                            </div> <br>
                        </div>
                    </div>
                </div>
            </section>

            <div class="submit-bttns">
                <button type="button" id="add-supplier-btn">Add Supplier</button>
                <button type="button" id="clear-btn">Clear</button>
            </div>
        </div>
    </div>
    <!-- JS Script -->
    <script src="../js/script.js"></script>
</body>

</html>