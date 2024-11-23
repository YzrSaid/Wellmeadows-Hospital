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


    <!-- Ipasok mo sa form elements mga forms kase naka div lang lahat,  then pa change ako ng mga id attribute into name attribute yung sa mga input element kase name attribute yung ginagamit ng php pang reference sa data -->

    <!-- Then may dinagdag ako na input dito sa patient form kase yung sa entities and attributes ni juls may fk dun ng clinic num na naka reference sa doctor so kailangan ata mag input ng clinic num kase di man pwede mag auto increment ang fk -->
    
    <!-- Then yung sa date registered wag na ata natin lagyan ng input i auto add nalang yung sa sql same lang man date and time kung kailan iaadd ng user yung form na yun -->

    <!-- Tas yung sa address di kase siya separate yung sa entities and attributes ni juls kaya naguguluhan ako kung iaadd ko lahat sa sql yung mga input form na yun, kung pwede isahin nalang natin yung address like parang textarea? -->

    
    <div class="wrapper">
        <div class="container">
            <h1>Add a Patient</h1>
            <section class="add-new-patient-section">
                <div class="accordion">
                    <div class="accordion-item">
                        <button class="accordion-header">Patient Information</button>
                        <div class="accordion-content"> <br>
                            <h4>Patient Details</h4> <br>
                            <div class="content-container">
                                <div class="column">
                                    <!-- First Name -->
                                    <div class="row">
                                        <label for="first_name">First Name</label>
                                        <input type="text" name="patient_first_name" id="first_name">
                                    </div>

                                    <!-- Location -->
                                    <div class="row">
                                        <label for="street">Street</label>
                                        <input type="text" name="patient_street" id="street">
                                    </div>

                                    <div class="row">
                                        <label for="city">City</label>
                                        <input type="text" name="patient_city" id="city">
                                    </div>

                                    <div class="row">
                                        <label for="country">Country</label>
                                        <input type="text" name="patient_country" id="country">
                                    </div>

                                    <!-- Marital Status -->
                                    <div class="row">
                                        <label for="marital-status">Marital Status</label>
                                        <select name="patient_m_status" id="marital-status">
                                            <option value="" disabled selected>Choose a status</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Divorced">Divorced</option>
                                            <option value="Widowed">Widowed</option>
                                            <option value="Prefer not to say">Prefer not to say</option>
                                        </select>
                                    </div>

                                <!-- Eto yung nadagdag -->
                                    <div class="row">
                                        <label for="country">Clinic Num</label>
                                        <input type="number" name="patient_clinic_num">
                                    </div>
                                </div>
                                    
                                <div class="column">
                                    <!-- Last Name -->
                                    <div class="row">
                                        <label for="first_name">Last Name</label>
                                        <input type="text" name="patient_last_name" id="first_name">
                                    </div>

                                    <!-- Gender -->
                                    <div class="row">
                                        <label for="gender">Gender</label>
                                        <select name="patient_gender" id="gender">
                                            <option value="" disabled selected>Choose a gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <!-- Phone -->
                                    <div class="row">
                                        <label for="phone-number">Phone Number</label>
                                        <input type="tel" name="patient_phone_num" id="phone-input">
                                    </div>

                                   

                                    <!-- Date of Birth -->
                                    <div class="row">
                                        <label for="date-of-birth">Date of Birth</label>
                                        <input type="date" name="patient_date_of_birth" id="date-of-birth">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <button class="accordion-header">Next-of-Kin Details</button>
                        <div class="accordion-content"> <br>
                            <h4>Next-of-Kin Details</h4> <br>
                            <div class="content-container">
                                <div class="column">
                                    <!-- First Name -->
                                    <div class="row">
                                        <label for="first_name">First Name</label>
                                        <input type="text" id="first_name">
                                    </div>

                                    <!-- Address -->
                                    <div class="row">
                                        <label for="street">Street/Purok</label>
                                        <input type="text" id="street">
                                    </div>

                                    <div class="row">
                                        <label for="barangay">Barangay</label>
                                        <input type="text" id="barangay">
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
                                        <label for="relationship">Relationship</label>
                                        <select id="relationship">
                                            <option value="" disabled selected>Relationship with the patient</option>
                                            <option value="Spouse">Spouse</option>
                                            <option value="Parent">Parent</option>
                                            <option value="Sibling">Sibling</option>
                                            <option value="Child">Child</option>
                                            <option value="Guardian">Guardian</option>
                                            <option value="Friend">Friend</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div class="row-special">
                                        <label id="other-relationship-label" for="other-relationship">If others, please specify:</label>
                                        <input type="text" id="other-relationship" name="other-relationship" disabled>
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
                        </div>
                    </div>
                    <div class="accordion-item">
                        <button class="accordion-header">Local Doctor Referral</button>
                        <div class="accordion-content"> <br>
                            <h4>Select a Local Doctor That Referred Patient</h4> <br>
                            <div class="content-container">
                                <div class="column" style="width:30%;">
                                    <!-- Doctor -->
                                    <div class="row">
                                        <label for="doctor-referred">Local Doctors: </label>
                                        <select id="relationship">
                                            <!-- options from db -->
                                        </select>
                                    </div>
                                </div>
                                <div class="column">
                                    <!-- Add a Doctor -->
                                    <div class="row">
                                        <p style="font-size: 14px;">Add new Local Doctor? <span><a href="local_doctor_information.php">Click here</a></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <button class="accordion-header">Appointment</button>
                        <div class="accordion-content"> <br>
                            <h4>Schedule an Appointment</h4> <br>
                            <div class="content-container">
                                <div class="column" style="width: 30%;">
                                    <!-- Exam Room -->
                                    <div class="row">
                                        <label for="doctor-referred">Exam Room </label>
                                        <input type="text" id="exam-room">
                                    </div>
                                </div>
                                <div class="column" style="width: 30%;">
                                    <!-- Apppointment Date and Time -->
                                    <div class="row">
                                        <label for="appointment-date-and-time">Appointment</label>
                                        <input type="time" id="appointment-time">
                                        <input type="date" id="appointment-date">
                                    </div>
                                </div>
                            </div>
                            <div class="content-container">
                                <div class="column" style="width: 30%;">
                                    <!-- Staff -->
                                    <div class="row">
                                        <label for="staff">Staff</label>
                                        <select name="staff" id="staff">
                                            <option value="" disabled selected>Choose</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
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
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="../js/script.js"></script>
    <script src="../js/ajax.js"></script>
</body>

</html>