$(document).ready(function () {
    // Fetch upcoming appointments
    $.ajax({
        url: '../php-fetch-forms/fetch-appointments.php',
        method: 'GET',
        data: { action: 'getUpcomingAppointments' },
        dataType: 'json',
        success: function (data) {
            const $select = $('#patient-details');
            if (data.error) {
                console.error(data.error);
                alert('Error: ' + data.error);
            } else {
                data.forEach(item => {
                    $select.append(`<option value="${item.patient_num}">${item.full_details}</option>`);
                });
            }
        },
        error: function (err) {
            console.error('Error fetching appointments:', err);
        }
    });

    // Populate Appointment Information
    $('#patient-details').on('change', function () {
        const patientNum = $(this).val();
        if (!patientNum) return;

        $.ajax({
            url: '../php-fetch-forms/fetch-appointments.php',
            method: 'GET',
            data: { action: 'getAppointmentInfo', patient_num: patientNum },
            dataType: 'json',
            success: function (data) {
                if (data.error) {
                    console.error(data.error);
                    alert('Error: ' + data.error);
                } else {
                    $('.patient-name').text(data.name);
                    $('.appointment-number').text(data.appointment_id);
                    $('#exam-room').val(data.exam_room);
                    $('#appt-date').val(data.date_of_exam);
                    $('#appt-time').val(data.time_of_exam);
                    $('#staff-number').val(data.staff_num);
                }
            },
            error: function (err) {
                console.error('Error fetching appointment info:', err);
            }
        });
    });

    // Handle Conduct Appointment Button Click - Open Conduct Appointments Accordion
    $('#conduct-appointment-btn').on('click', function () {
        const header = document.querySelector('#conduct-appointments-form .accordion-header');
        const content = header ? header.nextElementSibling : null;

        if (!header || !content) {
            console.error("Conduct Appointments form or its accordion structure is missing.");
            return;
        }

        // Check if it's already open
        if (content.style.maxHeight) {
            console.log("Accordion is already open.");
            return;
        }

        // Close all other accordion items
        document.querySelectorAll(".accordion-content").forEach((item) => {
            item.style.maxHeight = null; // Close other accordion items
        });

        // Open the Conduct Appointments accordion
        content.style.maxHeight = content.scrollHeight + "px";
    });
});

