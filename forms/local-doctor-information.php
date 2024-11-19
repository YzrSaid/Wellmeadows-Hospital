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
            <h1>Local Doctor Information</h1>
            <section class="add-new-doctor-section">
                <div class="accordion">
                    <!-- Add Local Doctor -->
                    <div class="accordion-item">
                        <button class="accordion-header">Add Doctor</button>
                        <div class="accordion-content"> <br>
                            <h4>Add Local Doctor Information</h4> <br>
                            <div class="content-container">
                                <!-- First Column -->
                                <div class="column">
                                    <!-- First Name -->
                                    <div class="row">
                                        <label for="first_name">First Name</label>
                                        <input type="text" id="first_name">
                                    </div>

                                    <!-- Location -->
                                    <div class="row">
                                        <label for="street">Street</label>
                                        <input type="text" id="street">
                                    </div>

                                    <div class="row">
                                        <label for="country">Country</label>
                                        <input type="text" id="country">
                                    </div>

                                    <!-- Phone -->
                                    <div class="row">
                                        <label for="phone-number">Phone Number</label>
                                        <input type="tel" id="phone-input">
                                    </div>
                                </div>

                                <!-- Second Column -->
                                <div class="column">
                                    <!-- Last Name -->
                                    <div class="row">
                                        <label for="first_name">Last Name</label>
                                        <input type="text" id="first_name">
                                    </div>

                                    <!-- City -->
                                    <div class="row">
                                        <label for="city">City</label>
                                        <input type="text" id="city">
                                    </div>

                                    <!-- Postal Code -->
                                    <div class="row">
                                        <label for="postal-code">Postal Code</label>
                                        <input type="number" id="postal-code">
                                    </div>

                                    <!-- Clinic Number -->
                                    <div class="row">
                                        <label for="clinig-number">Clinic Number</label>
                                        <input style="width: 100px; margin-right: 150px;" type="number" id="clinic-number">
                                    </div>
                                </div>
                            </div>
                            <div class="add-doctor-btn-container">
                                <button type="button" id="add-doctor-btn">Add Doctor</button>
                            </div>
                        </div>
                    </div>

                    <!-- Edit Local Doctor -->
                    <div class="accordion-item">
                        <button class="accordion-header">Edit Doctor</button>
                        <div class="accordion-content"> <br>
                            <h4>Edit Local Doctor</h4>
                            <div class="content-container">
                                <!-- First Column -->
                                <div class="column">

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