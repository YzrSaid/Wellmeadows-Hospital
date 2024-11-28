$(document).ready(function () {
  $('#add-qualification-btn').on('click', function () {
      // Collect data from the form
      let staffNumber = $('#staff-number').val();
      let qualificationType = $('#qualification-type').val();
      let qualificationDate = $('#date-of-qualification').val();
      let instituteName = $('#institute-name').val();

      // Validate fields (basic validation)
      if (!staffNumber || !qualificationType || !qualificationDate || !instituteName) {
          alert('All fields are required.');
          return;
      }

      // AJAX call
      $.ajax({
          url: '../data-submissions/submission-qualifications.php', // PHP script location
          method: 'POST',
          data: {
              staff_num: staffNumber,
              type: qualificationType,
              date_of_qualification: qualificationDate,
              institute_name: instituteName
          },
          success: function (response) {
              // Handle response
              alert(response);
              // Optionally, reset the form after successful submission
              $('#qualification-type').val('');
              $('#date-of-qualification').val('');
              $('#institute-name').val('');
          },
          error: function () {
              alert('Error adding qualification. Please try again.');
          }
      });
  });
});



// Manage Staff Qualifications
$(document).ready(function () {
  // Load qualifications data on page load
  function loadQualifications(searchQuery = '', sortBy = '') {
      $.ajax({
          url: '../php-fetch-forms/fetch-staff-qualifs.php',
          method: 'GET',
          data: {
              search: searchQuery,
              sort: sortBy
          },
          success: function (data) {
              // Populate table body
              $('.qualification-table tbody').html(data);
          },
          error: function () {
              alert('Failed to load qualifications. Please try again.');
          }
      });
  }

  // Call the function to load data initially
  loadQualifications();

  // Search functionality
  $('.search-btn').on('click', function () {
      const searchQuery = $('.search-input').val();
      loadQualifications(searchQuery, $('#sort-select').val());
  });

  // Sort functionality
  $('#sort-select').on('change', function () {
      const sortBy = $(this).val();
      loadQualifications($('.search-input').val(), sortBy);
  });
});// Manage Staff Qualifications
$(document).ready(function () {
  // Load qualifications data on page load
  function loadQualifications(searchQuery = '', sortBy = '') {
      $.ajax({
          url: '../php-fetch-forms/fetch-staff-qualifs.php',
          method: 'GET',
          data: {
              search: searchQuery,
              sort: sortBy
          },
          success: function (data) {
              // Populate table body
              $('.qualification-table tbody').html(data);
          },
          error: function () {
              alert('Failed to load qualifications. Please try again.');
          }
      });
  }

  // Call the function to load data initially
  loadQualifications();

  // Search functionality
  $('.search-btn').on('click', function () {
      const searchQuery = $('.search-input').val();
      loadQualifications(searchQuery, $('#sort-select').val());
  });

  // Sort functionality
  $('#sort-select').on('change', function () {
      const sortBy = $(this).val();
      loadQualifications($('.search-input').val(), sortBy);
  });
});