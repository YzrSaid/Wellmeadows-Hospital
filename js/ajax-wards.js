$(document).ready(function () {
  // Add Ward button click event
  $("#add-supplier-btn").on("click", function () {
    // Collect form data
    let wardName = $("#ward-name").val();
    let wardLocation = $("#ward-location").val();
    let totalBeds = $("#total-num-of-beds").val();
    let telExtension = $("#tel-extension-num").val();

    // Validate fields
    if (!wardName || !wardLocation || !totalBeds || !telExtension) {
      alert("All fields are required.");
      return;
    }

    // AJAX call to add the ward
    $.ajax({
      url: "../data-submissions/submission-form-wards.php", // PHP script location
      method: "POST",
      data: {
        ward_name: wardName,
        ward_location: wardLocation,
        total_beds: totalBeds,
        tel_extension: telExtension,
      },
      success: function (response) {
        alert(response);
        // Optionally, clear form fields
        $("#ward-name").val("");
        $("#ward-location").val("");
        $("#total-num-of-beds").val("");
        $("#tel-extension-num").val("");
      },
      error: function () {
        alert("Error adding the ward. Please try again.");
      },
    });
  });

  // Clear button click event
  $("#clear-btn").on("click", function () {
    $("#ward-name").val("");
    $("#ward-location").val("");
    $("#total-num-of-beds").val("");
    $("#tel-extension-num").val("");
  });
});

// This is for highlighting a row in the table whenever a user clicks an item (patient-table)
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector(".ward-table tbody");
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

// Fetch Wards Data
$(document).ready(function () {
  function fetchWards(sort = "", search = "") {
    $.ajax({
      url: "../php-fetch-forms/fetch-wards.php",
      type: "GET",
      data: { action: "fetch", sort, search },
      success: function (response) {
        $(".ward-table tbody").html(response);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching wards:", error);
      },
    });
  }

  // Initial Fetch
  fetchWards();

  // Search Functionality
  $(".search-btn").on("click", function () {
    const searchQuery = $(".search-input").val();
    fetchWards("", searchQuery);
  });

  // Sort Functionality
  $("#sort-select").on("change", function () {
    const sortValue = $(this).val();
    fetchWards(sortValue);
  });

  // Populate Update Form
  $(document).on("click", ".edit-btn", function () {
    const wardNum = $(this).data("ward-num");
    $.ajax({
      url: "../php/get_ward_details.php",
      type: "GET",
      data: { ward_num: wardNum },
      success: function (data) {
        const ward = JSON.parse(data);
        $("#ward-number").val(ward.ward_num);
        $("#ward-name").val(ward.ward_name);
        $("#ward-location").val(ward.location);
        $("#number-of-beds").val(ward.num_of_beds);
        $("#ward-tel-number").val(ward.phone_ext_num);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching ward details:", error);
      },
    });
  });

  // Edit Ward
  $("#conduct-appointment-btn").on("click", function () {
    const wardNum = $("#ward-number").val();
    const wardName = $("#ward-name").val();
    const wardLocation = $("#ward-location").val();
    const numberOfBeds = $("#number-of-beds").val();
    const wardTelNumber = $("#ward-tel-number").val();

    $.ajax({
      url: "../php-fetch-forms/fetch-wards.php",
      type: "POST",
      data: {
        ward_num: wardNum,
        ward_name: wardName,
        ward_location: wardLocation,
        num_of_beds: numberOfBeds,
        phone_ext_num: wardTelNumber,
      },
      success: function (response) {
        alert(response);
        fetchWards();
      },
      error: function (xhr, status, error) {
        console.error("Error updating ward:", error);
      },
    });
  });
});
