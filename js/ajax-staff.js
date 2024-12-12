$(document).ready(function () {
  $('#add-patient-btn').click(function (e) {
      e.preventDefault(); // Prevent form submission

      // Collect staff data
      let staffData = {
        ward_num: $('#ward-num').val(), // Added ward_num
        first_name: $('#first-name').val(),
        last_name: $('#last-name').val(),
        address: $('#address').val(),
        gender: $('#gender').val(),
        date_of_birth: $('#date-of-birth').val(),
        phone_num: $('#phone-input').val(),
        insurance_num: $('#staff-insurance-number').val(),
        position: $('#position').val(),
        current_salary: $('#current-salary').val(),
        salary_scale: $('#salary-scale').val(),
        num_of_hours: $('#number-of-hours').val(),
        contract_type: $('#contract-type').val(),
        type_of_salary: $('#type-of-salary').val(),
    };

      // Validate required fields
      if (!staffData.first_name || !staffData.last_name || !staffData.phone_num) {
          alert('Please fill out all required fields.');
          return;
      }

      // AJAX request to add staff
      $.ajax({
          url: '../data-submissions/submission-form-staff.php', // PHP endpoint
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ staff: staffData }),
          dataType: 'json',
          success: function (response) {
              if (response.success) {
                  alert('Staff information added successfully!');
                  window.location.reload(); // Reload the page after successful submission
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

  // Clear button functionality
  $('#clear-btn').click(function () {
      $('input, select').val('');
  });
});


// This is for highlighting a row in the table whenever a user clicks an item (patient-table)
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector(".staff-table tbody");
    const container = document.querySelector(".container2");
    const accordionContent = document.querySelector(".accordion-content");
  
    if (tableBody) {
      tableBody.addEventListener("click", async (event) => {
        const row = event.target.closest("tr");
        if (row) {
          // Remove 'selected' class from all rows
          tableBody.querySelectorAll("tr.selected").forEach((r) => {
            r.classList.remove("selected");
          });
  
          // Add 'selected' class to the clicked row
          row.classList.add("selected");
  
          // Show the container
          if (accordionContent) {
            accordionContent.style.maxHeight = "fit-content";
          }
          if (container) {
            container.style.display = "block";
          }
        }
      });
    }
  });
