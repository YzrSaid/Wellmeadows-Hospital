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
            <h1>Add a Staff</h1>
            <section class="add-new-patient-section">
                <div class="accordion">
                    <!-- Staff Information -->
                    <div class="accordion-item">
                        <button class="accordion-header">Staff Information</button>
                        <div class="accordion-content"> <br>
                            <h4>Staff Details</h4> <br>
                            <h4 style="color: #0c8882;">Personal Information</h4> <br>
                            <div class="content-container">
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
                                        <label for="city">City</label>
                                        <input type="text" id="city">
                                    </div>

                                    <div class="row">
                                        <label for="country">Country</label>
                                        <input type="text" id="country">
                                    </div>
                                </div>

                                <div class="column">
                                    <!-- Last Name -->
                                    <div class="row">
                                        <label for="first_name">Last Name</label>
                                        <input type="text" id="first_name">
                                    </div>

                                    <!-- Gender -->
                                    <div class="row">
                                        <label for="gender">Gender</label>
                                        <select id="gender">
                                            <option value="" disabled selected>Choose a gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <!-- Phone -->
                                    <div class="row">
                                        <label for="phone-number">Phone Number</label>
                                        <input type="tel" id="phone-input">
                                    </div>

                                    <!-- Date of Birth -->
                                    <div class="row">
                                        <label for="date-of-birth">Date of Birth</label>
                                        <input type="date" id="date-of-birth">
                                    </div>
                                </div>

                            </div>
                            <h4 style="color: #0c8882;">Employment Details</h4> <br>
                            <div class="content-container">
                                <!-- Insurance Number and Position -->
                                <div class="column">
                                    <!-- Insurance Number -->
                                    <div class="row">
                                        <label for="insurance-number">Insurance Number</label>
                                        <input type="number" id="insurance-number">
                                    </div>

                                    <!-- Salary Scale -->
                                    <div class="row">
                                        <label for="salary-scale">Salary Scale</label>
                                        <input type="text">
                                    </div>
                                </div>

                                <div class="column">
                                    <!-- Position -->
                                    <div class="row">
                                        <label for="position">Position</label>
                                        <select name="position" id="position">
                                            <option value="" disabled selected>Choose a position</option>
                                            <option value="Medical Doctor">Medical Doctor</option>
                                            <option value="Personnel Officer">Personal Officer</option>
                                            <option value="Charge Nurse">Charge Nurse</option>
                                            <option value="Specialist Staff">Specialist Staff</option>
                                        </select>
                                    </div>

                                    <!-- Current Salary -->
                                    <div class="row">
                                        <label for="current-salary">Current Salary</label>
                                        <input type="number" id="current-salary">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contract -->
                    <div class="accordion-item">
                        <button class="accordion-header">Staff Contract</button>
                        <div class="accordion-content"> <br>
                            <h4>Contract Information</h4> <br>
                            <div class="content-container">
                                <!-- Number of Hours, Contract Type, and Type of Salary -->
                                <div class="column">
                                    <!-- Contract Type -->
                                    <div class="row">
                                        <label for="contract-type">Contract Type</label>
                                        <select name="contract-type" id="contract-type" style="width: 60%;">
                                            <option value="" disabled selected>Choose a type of contract</option>
                                            <option value="Temporary">Temporary</option>
                                            <option value="Permanent">Permanent</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="column">
                                    <!-- Number of Hours -->
                                    <div class="row">
                                        <label for="number-of-hours">Number of Hours</label>
                                        <input type="number" id="number-of-hours" style="width: 55%;">
                                    </div>

                                </div>
                                <div class="column">
                                    <!-- Type of Salary -->
                                    <div class="row">
                                        <label for="type-of-salary">Type of Salary</label>
                                        <select name="type-of-salary" id="type-of-salary" style="width: 60%;">
                                            <option value="" disabled selected>Choose type of salary</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>
                            </div> <br> <br>
                        </div>
                    </div>
                </div>
            </section>

            <div class="submit-bttns">
                <button type="button" id="add-patient-btn">Add Patient</button>
                <button type="button" id="clear-btn">Clear</button>
            </div>
        </div>
    </div>
    <!-- JS Script -->
    <script src="../js/script.js"></script>
</body>

</html>