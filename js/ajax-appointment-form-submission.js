$(document).ready(function () {
    console.log("Document ready!");

    // Fetch wards data and populate the ward dropdown
    $.ajax({
        url: '../php-fetch-forms/fetch-appointment-ward.php', // Updated PHP script to fetch wards
        method: 'GET',
        success: function (response) {
            console.log("Ward data fetched:", response);
            const wardSelect = $('#ward');
            wardSelect.empty(); // Clear existing options
            wardSelect.append('<option value="" disabled selected>Select a ward</option>');
            
            // Populate dropdown with fetched ward data
            response.forEach(ward => {
                wardSelect.append('<option value="' + ward.ward_num + '">' + ward.ward_name + '</option>');
            });
        },
        error: function (error) {
            console.error("Error fetching ward data:", error);
        }
    });

    // Attach event listener to the submit examination button
    $(document).on('click', '#submit-examination-btn', function () {
        console.log("Submit button clicked!");

        const selectedOption = $('input[name="examination"]:checked').val();
        console.log("Selected Option:", selectedOption);

        let requestData = {};

        // For Out-Patient
        if (selectedOption === 'Out-Patient') {
            const patientNum = $('#patient-details').val();
            const dateOfAppt = $('#appt-date-out').val();
            const timeOfAppt = $('#appt-time-out').val();

            if (!patientNum || !dateOfAppt || !timeOfAppt) {
                alert('Please fill in all fields for Out-Patient.');
                return;
            }

            requestData = {
                type: 'Out-Patient',
                patient_num: patientNum,
                date_of_appt: dateOfAppt,
                time_of_appt: timeOfAppt
            };
        } 
        // For In-Patient
        else if (selectedOption === 'In-Patient') {
            const patientNum = $('#patient-details').val();
            const wardNum = $('#ward').val();
            const waitingListDate = $('#waiting-list-date').val();
            const expectedStay = $('#expected-stay').val();
            const dateAdmitted = $('#date-admitted').val();
            const dateExpectedLeave = $('#date-expected-leave').val();
            const bedNum = $('#bed-num').val();

            if (!patientNum || !wardNum || !waitingListDate || !expectedStay || !dateAdmitted || !dateExpectedLeave || !bedNum) {
                alert('Please fill in all fields for In-Patient.');
                return;
            }

            requestData = {
                type: 'In-Patient',
                patient_num: patientNum,
                ward_num: wardNum,
                waiting_list_date: waitingListDate,
                expected_stay: expectedStay,
                date_admitted: dateAdmitted,
                date_expected_leave: dateExpectedLeave,
                bed_num: bedNum
            };
        } 
        else {
            alert('Please select an appointment type.');
            return;
        }

        console.log("Request Data:", requestData);

        // AJAX Request to submit the form
        $.ajax({
            url: '../data-submissions/submission-form-appointments.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function (data) {
                console.log("Server Response:", data);
                if (data.message) {
                    alert(data.message);
                } else {
                    alert("Unexpected server response.");
                }
            },
            error: function (err) {
                console.error("Error conducting appointment:", err);
                alert("Failed to submit examination. Please try again.");
            }
        });
    });
});
