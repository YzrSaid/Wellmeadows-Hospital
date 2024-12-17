$(document).ready(function () {
  // Fetch patient data and pharmaceutical supplies data
  $.ajax({
      url: '../php-fetch-forms/fetch-medication.php', // Path to fetch patients and supplies
      method: 'GET',
      dataType: 'json',
      success: function (data) {
          console.log(data); // For debugging purposes

          if (data.error) {
              alert('Error: ' + data.error);
              return;
          }

          // Populate patient options
          if (data.patients && data.patients.length > 0) {
              data.patients.forEach(function (patient) {
                  $('#in-patient').append(
                      `<option value="${patient.patient_num}">${patient.name}</option>`
                  );
              });
          } else {
              $('#in-patient').append('<option value="" disabled>No patients available</option>');
          }

          // Populate drug options
          if (data.supplies && data.supplies.length > 0) {
              data.supplies.forEach(function (item) {
                  $('#drug-options').append(
                      `<option value="${item.drug_num}">${item.drug_name}</option>`
                  );
              });
          } else {
              alert("No pharmaceutical supplies found.");
          }
      },
      error: function (xhr, status, error) {
          console.error('Error fetching patient or pharmaceutical supplies:', error);
      }
  });

  // Ensure the method-of-admin and drug-name are only fetched after the user selects a drug
  $('#drug-options').change(function () {
    var drugNum = $(this).val();  // Get the selected drug number

    console.log("Selected drug number: ", drugNum); // Log the selected drug number

    if (drugNum) {
        $.ajax({
            url: '../php-fetch-forms/fetch-medication-methodOfAdmin.php', // PHP script to fetch method_of_admin and drug_name
            method: 'GET',
            data: { drug_num: drugNum }, // Send drug_num to fetch data
            dataType: 'json',
            success: function (data) {
                console.log("Response from fetch-medication-methodOfAdmin.php:", data); // Log the response
                if (data.error) {
                    alert('Error: ' + data.error);
                } else {
                    // Populate the fields with method_of_admin and drug_name
                    $('#method-of-admin').val(data.method_of_admin); // Set the method_of_admin in hidden field or similar
                    $('#drug-name').text(data.drug_name); // Display drug name in text element
                }
            },
            error: function (xhr, status, error) {
                console.error('Error fetching method of administration or drug name:', error);
            }
        });
    } else {
        console.log("No drug selected.");
    }
});


  // Form submission via AJAX
  $('#conduct-appointment-btn').click(function (e) {
      e.preventDefault();  // Prevents default form submission

      // Gather form data
      var patientNum = $('#in-patient').val();  // Get the selected patient number
      var drugNum = $('#drug-options').val();   // Get the selected drug number
      var unitsPerDay = $('#units-per-day').val();  // Get the units per day (manual input)
      var startDate = $('#start-date').val();  // Get the start date
      var endDate = $('#end-date').val();    // Get the end date

      // Log data for debugging
      console.log({
          patient_num: patientNum,
          drug_num: drugNum,
          units_per_day: unitsPerDay,
          start_date: startDate,
          end_date: endDate
      });

      // Make sure all fields are filled out
      if (!patientNum || !drugNum || !unitsPerDay || !startDate || !endDate) {
          alert("Please fill out all fields.");
          return;
      }

      // AJAX to submit form data to the PHP script
      $.ajax({
          url: '../data-submissions/submission-form-medication.php',  // PHP script to process form submission
          method: 'POST',  // HTTP method (POST)
          data: {
              patient_num: patientNum,  // Send patient number
              drug_num: drugNum,        // Send drug number
              units_per_day: unitsPerDay,  // Send units per day (user input)
              start_date: startDate,   // Send start date
              end_date: endDate        // Send end date
          },
          success: function (response) {
              if (response.success) {
                  alert("Medication information saved successfully!");  // Success message
              } else {
                  alert("Error saving medication information: " + response.error);  // Error message
              }
          },
          error: function (xhr, status, error) {
              console.error('Error submitting medication data:', error);  // Log any AJAX request error
          }
      });
  });
});
