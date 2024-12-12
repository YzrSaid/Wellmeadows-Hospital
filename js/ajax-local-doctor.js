$(document).ready(function () {
  // Add Doctor button click event
  $('#add-doctor-btn').on('click', function () {
      // Collect form data
      const firstName = $('#first-name').val().trim();
      const lastName = $('#last-name').val().trim();
      const address = $('#address').val().trim();
      const phone = $('#phone-input').val().trim();

      // Validate fields
      if (!firstName || !lastName || !address || !phone) {
          alert('All required fields must be filled.');
          return;
      }

      // AJAX call to add the doctor
      $.ajax({
          url: '../data-submissions/submission-form-doctor.php', // PHP script location
          method: 'POST',
          data: {
              first_name: firstName,
              last_name: lastName,
              address: address,
              phone: phone,
          },
          success: function (response) {
              alert(response); // Display server response
              // Optionally, clear form fields
              $('#first-name').val('');
              $('#last-name').val('');
              $('#address').val('');
              $('#phone-input').val('');
          },
          error: function () {
              alert('Error adding the doctor. Please try again.');
          },
      });
  });

  // Clear button click event
  $('#clear-btn').on('click', function () {
      $('#first-name').val('');
      $('#last-name').val('');
      $('#address').val('');
      $('#phone-input').val('');
  });
});


// MANAGE DOCTORS

$(document).ready(function () {
  // Fetch doctors and populate the select dropdown and table
  function fetchDoctors() {
      $.ajax({
          url: '../php-fetch-forms/fetch-doctors.php', // PHP script to fetch doctor data
          method: 'GET',
          dataType: 'json',
          success: function (response) {
              // Populate the select element
              const doctorSelect = $('#local-doctors');
              doctorSelect.empty(); // Clear existing options
              response.forEach(doctor => {
                  doctorSelect.append(new Option(`${doctor.first_name} ${doctor.last_name}`, doctor.clinic_num));
              });

              // Populate the table
              const doctorTable = $('.local-doctor-table tbody');
              doctorTable.empty(); // Clear existing rows
              response.forEach(doctor => {
                  const row = `
                      <tr>
                          <td>${doctor.clinic_num}</td>
                          <td>${doctor.first_name} ${doctor.last_name}</td>
                          <td>${doctor.address}</td>
                          <td>${doctor.phone_num}</td>
                      </tr>`;
                  doctorTable.append(row);
              });
          },
          error: function () {
              alert('Error fetching doctors.');
          },
      });
  }

  // Initial fetch
  fetchDoctors();

  // Example: Add an event listener for the edit button (optional functionality)
  $('#conduct-appointment-btn').on('click', function () {
      alert('Edit functionality to be implemented!');
  });
});
