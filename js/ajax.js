$(document).ready(function () {
  $('#add-patient-btn').click(function () {
      // Create an object to store data
      const data = {};

      // Select all input, select, and textarea elements
      $('input, select, textarea').each(function () {
          const name = $(this).attr('name');
          const value = $(this).val();

          // Add to the data object if a name attribute is present
          if (name) {
              data[name] = value;
          }
      });

      // Send data via AJAX
      $.ajax({
          url: 'submission-forms.php', // Replace with your server-side endpoint
          type: 'POST',
          data: JSON.stringify(data), // Send as JSON
          contentType: 'application/json; charset=utf-8', // Tell server it's JSON
          dataType: 'json', // Expect a JSON response
          success: function (response) {
              if (response.success) {
                  alert('Patient added successfully!');
              } else {
                  alert('Failed to add patient: ' + (response.error || 'Unknown error'));
              }
          },
          error: function (xhr, status, error) {
              console.error('AJAX Error:', status, error);
              alert('An error occurred while adding the patient.');
          }
      });
  });

  // Clear button functionality
  $('#clear-btn').click(function () {
      $('input, select, textarea').val(''); // Clear all fields
  });
});
