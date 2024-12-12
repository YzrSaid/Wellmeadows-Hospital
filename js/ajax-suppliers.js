$(document).ready(function () {
  // Add Supplier button click event
  $("#add-supplier-btn").on("click", function () {
    // Collect form data
    let supplierName = $("#supplier-name-a").val();
    let supplierAddress = $("#address").val();
    let supplierEmail = $("#supplier-email").val();
    let supplierTelNum = $("#supplier-tel-num").val();
    let supplierFaxNum = $("#supplier-fax-num").val();

    // Validate fields
    if (
      !supplierName ||
      !supplierAddress ||
      !supplierEmail ||
      !supplierTelNum
    ) {
      alert("All required fields must be filled.");
      return;
    }

    // AJAX call to add the supplier
    $.ajax({
      url: "../data-submissions/submission-form-suppliers.php", // PHP script location
      method: "POST",
      data: {
        supplier_name: supplierName,
        supplier_address: supplierAddress,
        supplier_email: supplierEmail,
        supplier_tel_num: supplierTelNum,
        supplier_fax_num: supplierFaxNum,
      },
      success: function (response) {
        alert(response); // Display server response
        // Optionally, clear form fields
        $("#supplier-name-a").val("");
        $("#address").val("");
        $("#supplier-email").val("");
        $("#supplier-tel-num").val("");
        $("#supplier-fax-num").val("");
      },
      error: function () {
        alert("Error adding the supplier. Please try again.");
      },
    });
  });

  // Clear button click event
  $("#clear-btn").on("click", function () {
    $("#supplier-name-a").val("");
    $("#address").val("");
    $("#supplier-email").val("");
    $("#supplier-tel-num").val("");
    $("#supplier-fax-num").val("");
  });
});

// MANAGE SUPPLIERS

$(document).ready(function () {
  // Function to fetch suppliers from the database
  function fetchSuppliers(searchQuery = "", sortOption = "") {
    $.ajax({
      url: "../php-fetch-forms/fetch-suppliers.php", // Adjust the path to your PHP script
      type: "GET",
      data: {
        search: searchQuery,
        sort: sortOption,
      },
      success: function (response) {
        // Update the table body with the fetched data
        $(".supplier-table tbody").html(response);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching suppliers:", error);
      },
    });
  }

  // Initial fetch
  fetchSuppliers();

  // Search functionality
  $(".search-btn").on("click", function () {
    const searchQuery = $(".search-input").val();
    fetchSuppliers(searchQuery, "");
  });

  // Sort functionality
  $("#sort-select").on("change", function () {
    const sortOption = $(this).val();
    fetchSuppliers("", sortOption);
  });
});

// This is for highlighting a row in the table whenever a user clicks an item (surplier-table)
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector(".supplier-table tbody");
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
