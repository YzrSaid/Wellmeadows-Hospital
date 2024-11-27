$(document).ready(function () {
  $('#add-patient-btn').click(function () {
      // Collect form data
      let patientData = {
          first_name: $('#first_name').val(),
          last_name: $('#last_name').val(),
          address: $('#address').val(),
          phone_num: $('#phone-input').val(),
          gender: $('#gender').val(),
          date_of_birth: $('#date-of-birth').val(),
          m_status: $('#marital-status').val(),
          clinic_num: $('#clinic-num').val(),
      };

      // Simple client-side validation
      if (!patientData.first_name || !patientData.last_name || !patientData.phone_num) {
          alert('Please fill out all required fields in the patient form.');
          return;
      }

      // AJAX request to add patient and get `patient_num`
      $.ajax({
          url: '../data-submissions/submission-form-patients.php', // PHP endpoint
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ patient: patientData }),
          dataType: 'json',
          success: function (response) {
              if (response.success) {
                  // Get the returned `patient_num`
                  let patient_num = response.patient_num;

                  // Add Next-of-Kin
                  let kinData = {
                      first_name: $('#first-name').val(),
                      last_name: $('#last-name').val(),
                      address: $('#kin-address').val(),
                      relationship: $('#relationship').val(),
                      phone_num: $('#kin-phone-input').val(),
                      patient_num: patient_num, // Use the returned `patient_num`
                  };

                  // Add Appointment
                  let appointmentData = {
                      patient_num: patient_num, // Use the returned `patient_num`
                      date_of_exam: $('#appointment-date').val(),
                      time_of_exam: $('#appointment-time').val(),
                      exam_room: $('#exam-room').val(),
                      staff_num: $('#staff').val(),
                  };

                  // Validate and send Next-of-Kin data
                  if (kinData.first_name && kinData.relationship) {
                      $.ajax({
                          url: '../data-submissions/submission-form.php',
                          type: 'POST',
                          contentType: 'application/json',
                          data: JSON.stringify({ next_of_kin: kinData }),
                          dataType: 'json',
                          success: function (kinResponse) {
                              if (!kinResponse.success) {
                                  alert('Error adding next-of-kin: ' + kinResponse.message);
                              }
                          },
                          error: function () {
                              alert('An error occurred adding next-of-kin.');
                          },
                      });
                  }

                  // Validate and send Appointment data
                  if (appointmentData.date_of_exam) {
                      $.ajax({
                          url: '../data-submissions/submission-form.php',
                          type: 'POST',
                          contentType: 'application/json',
                          data: JSON.stringify({ appointment: appointmentData }),
                          dataType: 'json',
                          success: function (appointmentResponse) {
                              if (!appointmentResponse.success) {
                                  alert('Error adding appointment: ' + appointmentResponse.message);
                              }
                          },
                          error: function () {
                              alert('An error occurred adding the appointment.');
                          },
                      });
                  }

                  alert('Patient, Next-of-Kin, and Appointment added successfully!');
                  window.location.reload();
              } else {
                  alert('Error: ' + response.message);
              }
          },
          error: function (xhr) {
              console.error('AJAX Error:', xhr.responseText);
              alert('An error occurred: ' + xhr.responseText);
          },
      });
  });

  $('#clear-btn').click(function () {
      $('input, select').val('');
  });
});


// manage_patients.js

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const tableRows = document.querySelectorAll('.patient-table tbody tr');

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        tableRows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
        });
    });

    // Sort functionality
    const sortSelect = document.getElementById('sort-select');
    const tbody = document.querySelector('.patient-table tbody');

    sortSelect.addEventListener('change', () => {
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const columnIndex = sortSelect.selectedIndex - 1;

        rows.sort((a, b) => {
            const aText = a.children[columnIndex]?.textContent.trim();
            const bText = b.children[columnIndex]?.textContent.trim();
            return aText.localeCompare(bText, undefined, { numeric: true });
        });

        rows.forEach(row => tbody.appendChild(row));
    });

    // Fetch patient data from the server
    fetch('../php-fetch-forms/fetch-patients.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('.patient-table tbody');
            data.forEach(patient => {
                const row = document.createElement('tr');
                
                // Make sure each property is present before appending it to avoid errors
                row.innerHTML = `
                    <td>${patient.clinic_num || 'N/A'}</td>
                    <td>${patient.full_name || 'N/A'}</td>
                    <td>${patient.gender || 'N/A'}</td>
                    <td>${patient.address || 'N/A'}</td>
                    <td>${patient.m_status || 'N/A'}</td>
                    <td>${patient.phone_num || 'N/A'}</td>
                    <td>${patient.date_of_birth || 'N/A'}</td>
                    <td>${patient.date_registered || 'N/A'}</td>
                    <td>${patient.next_of_kin_name ? patient.next_of_kin_name + ' (' + patient.relationship + ')' : 'N/A'}</td>
                `;
                
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching patient data:', error));
});

