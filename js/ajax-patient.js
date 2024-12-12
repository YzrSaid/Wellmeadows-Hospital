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


// Function to initialize close button functionality for any table
function initializeCloseButton() {
    document.querySelectorAll(".close-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Find the parent container of the close button
        const container = btn.closest(".container2");
        if (container) {
          // Hide the container
          container.style.display = "none";
  
          // Deselect any selected rows in the table that corresponds to this container
          deselectTableRow(container);
        } else {
          console.error("No container found to hide!"); // Debugging aid
        }
      });
    });
  }

  // Function to deselect any selected row in all relevant tables within the container
function deselectTableRow(container) {
    // Find all tables within the same wrapper
    const tables = container
      .closest(".wrapper")
      .querySelectorAll(
        ".supplier-table, .patient-table, .work-experience-table, .qualification-table, .ward-table, .pharma-table, .surg-table, .non-surg-table"
      ); // Add class selectors for other tables
  
    if (tables.length) {
      // Iterate through each table and deselect any selected rows
      tables.forEach((table) => {
        table.querySelectorAll("tbody tr.selected").forEach((row) => {
          row.classList.remove("selected");
        });
      });
    }
  }
  // Sample to push 
  // yawa ka Jones
  // Initialize the close button functionality when the DOM is ready
  document.addEventListener("DOMContentLoaded", initializeCloseButton);
  

  // This is for highlighting a row in the table whenever a user clicks an item (patient-table)
document.querySelectorAll(".patient-table tbody tr").forEach((row) => {
    row.addEventListener("click", function () {
      // Remove 'selected' class from all rows
      document.querySelectorAll(".patient-table tbody tr").forEach((r) => {
        r.classList.remove("selected");
      });
  
      // Add 'selected' class to the clicked row
      this.classList.add("selected");
  
      // Make the .accordion-content big enough to allow the container fit
      const accordionContent = document.querySelector(".accordion-content");
  
      accordionContent.style.maxHeight = "fit-content";
      // Show the container
      const container = document.querySelector(".container2");
      if (container) {
        // Set container visibility
        container.style.cssText = "display: block;";
      }
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

