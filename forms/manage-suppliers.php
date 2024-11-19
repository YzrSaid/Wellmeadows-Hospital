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
            <h1>Manage Suppliers</h1>
            <section class="wards-section">
                <div class="accordion">
                    <!-- Patient List -->
                    <div class="accordion-item">
                        <button class="accordion-header">Supplier List</button>
                        <div class="accordion-content" style="padding: 0px 10px;"> <br>
                            <!-- Searchbox and sort btn -->
                            <div class="search">
                                <div class="search-container">
                                    <input type="text" placeholder="Search..." class="search-input" />
                                    <button class="search-btn">Search</button>
                                </div>
                                <div class="sort-container">
                                    <select name="sort" id="sort-select" class="sort-select">
                                        <option value="" disabled selected>Sort</option>
                                        <option value="supplier-number">ID</option>
                                        <option value="supplier-name">Name</option>
                                        <option value="supplier-address">Address</option>
                                        <option value="supplier-email">Email</option>
                                        <option value="supplier-tel-num">Tel. Number</option>
                                        <option value="supplier-fax-num">Fax Number</option>
                                    </select>
                                </div>
                            </div>
                            <div class="content-container">
                                <div class="table-container">
                                    <table class="supplier-table">
                                        <thead>
                                            <tr>
                                                <th>Supplier #</th>
                                                <th>Supplier Name</th>
                                                <th>Address</th>
                                                <th>Email</th>
                                                <th>Tel. Number</th>
                                                <th>Fax Number</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <!-- Supplier Number -->
                                                <td>0001</td>

                                                <!-- Supplier Name -->
                                                <td>Shenzheng Sorting Center</td>

                                                <!-- Address -->
                                                <td>Sampaloc Drive, Talon-Talon, Zamboanga City, Philippines</td>

                                                <!-- Email -->
                                                <td>sample_username@gmail.com</td>

                                                <!-- Tel. Number -->
                                                <td>+63 35 826 8263</td>

                                                <!-- Fax Number -->
                                                <td>00022412</td>
                                            </tr>
                                            <tr>
                                                <!-- Supplier Number -->
                                                <td>0001</td>

                                                <!-- Supplier Name -->
                                                <td>Shenzheng Sorting Center</td>

                                                <!-- Address -->
                                                <td>Sampaloc Drive, Talon-Talon, Zamboanga City, Philippines</td>

                                                <!-- Email -->
                                                <td>sample_username@gmail.com</td>

                                                <!-- Tel. Number -->
                                                <td>+63 35 826 8263</td>

                                                <!-- Fax Number -->
                                                <td>00022412</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- View and Update Container -->
                            <h4 class="container2-title">Supplier Information</h4> <br>
                            <div class="container2">

                                <!-- Supplier Number -->
                                <div class="content-container">
                                    <div class="column">
                                        <div class="row">
                                            <label for="supplier-num">Supplier Number</label>
                                            <input type="number" id="supplier-number" value="0001" readonly style="margin-right: 20px;">
                                        </div>
                                    </div>
                                </div>
 
                                <!-- Supplier Name -->
                                <div class="content-container">
                                    <!-- Patient Name -->
                                    <div class="column" style="width: 57.5%;">
                                        <div class="row">
                                            <label for="patient-name">Supplier Name</label>
                                            <input type="text" id="first-name" value="Shenzheng Sorting Center" readonly style="width: 450px;">
                                        </div>
                                    </div>
                                </div>

                                <!-- Supplier Address-->
                                <div class="content-container">
                                    <div class="column" style="width: 1800px;">
                                        <div class="row">
                                            <label for="addr">Address</label>
                                        </div>
                                        <div class="row">
                                            <input type="text" id="supplier-street" value="Sampaloc Drive" readonly style="width: 220px;">
                                            <input type="text" id="supplier-barangay" value="Talon-Talon" readonly style="width: 220px;">
                                            <input type="text" id="supplier-city" value="Zamboanga City" readonly style="width: 220px;">
                                            <input type="text" id="supplier-country" value="Philippines" readonly style="width: 220px;">
                                        </div>
                                        <div class="row" style="width: 100%; margin-left: 0px; margin-top: -10px;">
                                            <label for="street/purok" style="font-size: 12px; font-weight: normal; margin-left: 58px">Street/Purok</label>
                                            <label for="barangay" style="font-size: 12px; font-weight: normal; margin-left: -20px;">Barangay</label>
                                            <label for="city" style="font-size: 12px; font-weight: normal; margin-right: 20px;">City</label>
                                            <label for="country" style="font-size: 12px; font-weight: normal; margin-right: 70px;">Country</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Supplier Tel. Number and Supplier Fax Number -->
                                <div class="content-container">
                                     <!-- Supplier Tel. Number -->
                                     <div class="column">
                                        <div class="row">
                                            <label for="supplier-tel-number">Tel. Number</label>
                                            <input type="tel" id="supplier-tel-number" value="+63 935 826 8263">
                                        </div>
                                    </div>

                                    <!-- Fax Number -->
                                    <div class="column">
                                        <div class="row">
                                            <label for="supplier-fax-number">Fax Number</label>
                                            <input type="number" id="supplier-fax-number" value="00022412">
                                        </div>
                                    </div>
                                </div> <br>
                                <div class="conduct-appointment-btn-container">
                                    <button type="button" id="conduct-appointment-btn">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <!-- JS Script -->
    <script src="../js/script.js"></script>
</body>

</html>