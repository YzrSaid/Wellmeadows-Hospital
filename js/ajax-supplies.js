$(document).ready(function () {
  // Add Pharmaceutical Supply
  $("#add-supplier-btn").click(function (e) {
    e.preventDefault();
    const supplyData = {
      drug_name: $("#drug-name").val(),
      dosage: $("#dosage").val(),
      quantity_stock: $("#phar-quantity-stock").val(),
      reorder_level: $("#phar-re-order-level").val(),
      cost_per_unit: $("#phar-cost-per-unit").val(),
      description: $("#phar-supply-description").val(),
      method_admin: $("#phar-method-admin").val(),
      type: "pharmaceutical",
    };
    submitSupply(supplyData);
  });

  // Add Non-Surgical Supply
  $("#add-supplier-btn").click(function (e) {
    e.preventDefault();
    const supplyData = {
      item_name: $("#non-surg-name").val(),
      quantity_stock: $("#non-surg-quantity-stock").val(),
      reorder_level: $("#non-surg-re-order-level").val(),
      cost_per_unit: $("#non-surg-cost-per-unit").val(),
      description: $("#non-surg-supply-description").val(),
      type: "non-surgical",
    };
    submitSupply(supplyData);
  });

  // Add Surgical Supply
  $("#add-supplier-btn").click(function (e) {
    e.preventDefault();
    const supplyData = {
      item_name: $("#surg-name").val(),
      quantity_stock: $("#surg-quantity-stock").val(),
      reorder_level: $("#surg-re-order-level").val(),
      cost_per_unit: $("#surg-cost-per-unit").val(),
      description: $("#surg-supply-description").val(),
      type: "surgical",
    };
    submitSupply(supplyData);
  });

  // Function to Submit Supply
  function submitSupply(supplyData) {
    // Simple client-side validation
    if (
      (!supplyData.item_name && !supplyData.drug_name) ||
      !supplyData.quantity_stock ||
      !supplyData.reorder_level ||
      !supplyData.cost_per_unit
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    // AJAX Request
    $.ajax({
      url: "../data-submissions/submission-form-supplies.php",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ supply: supplyData }),
      dataType: "json",
      success: function (response) {
        if (response.success) {
          alert("Supply added successfully!");
          window.location.reload();
        } else {
          alert("Error: " + response.message);
        }
      },
      error: function (xhr) {
        console.error("AJAX Error:", xhr.responseText);
        alert("An error occurred: " + xhr.responseText);
      },
    });
  }
});

// MANAGE SUPPLIES

// manage supplies part 2

document.addEventListener("DOMContentLoaded", () => {
  const pharmaTableSelector = ".pharma-table tbody";
  const pharmaSearchInputSelector = ".search-input";

  // Fetch and populate supplies
  fetchSupplies(
    "pharmaceutical",
    pharmaTableSelector,
    pharmaSearchInputSelector
  );

  // Function to close the details container
  const closeBtn = document.querySelector("#close-btn");
  const detailsContainer = document.querySelector("#container2-1");

  if (closeBtn && detailsContainer) {
    closeBtn.addEventListener("click", () => {
      detailsContainer.style.display = "none";
    });
  }

  // Edit button functionality
  const editButton = document.querySelector("#conduct-appointment-btn");
  if (editButton) {
    editButton.addEventListener("click", () => {
      const descriptionTextarea = document.querySelector(
        "#phar-supply-description"
      );
      const methodAdminTextarea = document.querySelector("#phar-method-admin");

      if (descriptionTextarea && methodAdminTextarea) {
        descriptionTextarea.removeAttribute("readonly");
        methodAdminTextarea.removeAttribute("readonly");

        // Optionally, switch the button text to "Save" or enable saving functionality
        editButton.textContent = "Save";
        editButton.addEventListener("click", () => {
          console.log("Saving changes...");

          // Logic to save the updated data can go here
        });
      }
    });
  }
});

// Fetch supplies and handle table and search functionality
function fetchSupplies(type, tableSelector, searchInputId) {
  console.log(`Fetching ${type} supplies`); // Log the type being fetched
  fetch(`../php-fetch-forms/fetch-supplies.php?type=${type}`)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector(tableSelector);
      const descriptionTextarea = document.querySelector(
        "#phar-supply-description"
      );
      const methodAdminTextarea = document.querySelector("#phar-method-admin");

      tableBody.innerHTML = "";
      data.forEach((supply) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${supply.id}</td>
                    <td>${supply.drug_name || supply.item_name}</td>
                    <td>${supply.dosage || ""}</td>
                    <td>${supply.quantity_stock}</td>
                    <td>${supply.cost_per_unit}</td>
                    <td>${supply.reorder_level}</td>
                `;

        // Add click event listener to populate textareas
        row.addEventListener("click", () => {
          descriptionTextarea.value =
            supply.description || "No description available.";
          methodAdminTextarea.value =
            supply.method_of_admin || "No method available.";
          document.querySelector("#container2-1").style.display = "block"; // Show the details container
        });

        tableBody.appendChild(row);
      });

      // Attach search event listener
      const searchInput = document.querySelector(searchInputId);
      console.log(
        `Setting up search for ${type} supplies with input:`,
        searchInputId
      ); // Log the search input
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        console.log(`Searching ${type} supplies with query:`, query); // Log the search query
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row) => {
          const cells = row.querySelectorAll("td");
          const matches = Array.from(cells).some((cell) =>
            cell.textContent.toLowerCase().includes(query)
          );
          row.style.display = matches ? "" : "none";
        });
      });
    })
    .catch((error) => console.error(`Error fetching ${type} supplies:`, error));
}

// surgical supplies

document.addEventListener("DOMContentLoaded", () => {
  const surgTableSelector = ".surg-table tbody";
  const surgSearchInputSelector = ".search-input";
  const sortSelectId = "#sort-select"; // ID for sort dropdown

  // Fetch and populate surgical supplies
  fetchSupplies(
    "surgical",
    surgTableSelector,
    surgSearchInputSelector,
    sortSelectId
  );

  // Close button functionality for details container
  const closeBtn = document.querySelector("#close-btn");
  const detailsContainer = document.querySelector("#container2-2");

  if (closeBtn && detailsContainer) {
    closeBtn.addEventListener("click", () => {
      detailsContainer.style.display = "none";
    });
  }

  // Edit button functionality
  const editButton = document.querySelector("#conduct-appointment-btn");
  if (editButton) {
    editButton.addEventListener("click", () => {
      const descriptionTextarea = document.querySelector(
        "#surg-supply-description"
      );

      if (descriptionTextarea) {
        descriptionTextarea.removeAttribute("readonly");
        editButton.textContent = "Save";
        editButton.addEventListener("click", () => {
          console.log("Saving changes...");

          // Logic to save the updated data can go here
        });
      }
    });
  }
});

// Fetch surgical supplies and handle table and search functionality
function fetchSupplies(type, tableSelector, searchInputId, sortSelectId) {
  console.log(`Fetching ${type} supplies`); // Log the type being fetched
  const sortSelect = document.querySelector(sortSelectId);
  const sortBy = sortSelect ? sortSelect.value : ""; // Get the selected sorting option

  fetch(`../php-fetch-forms/fetch-supplies.php?type=${type}&sort=${sortBy}`)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector(tableSelector);
      const descriptionTextarea = document.querySelector(
        "#surg-supply-description"
      );

      tableBody.innerHTML = ""; // Clear any existing rows

      // Sort data if sortBy is selected
      if (sortBy) {
        data.sort((a, b) => {
          if (a[sortBy] > b[sortBy]) {
            return 1;
          } else if (a[sortBy] < b[sortBy]) {
            return -1;
          }
          return 0;
        });
      }

      // Render the table with sorted or original data
      data.forEach((supply) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${supply.item_number}</td>
                  <td>${supply.item_name}</td>
                  <td>${supply.stock_qtty}</td>
                  <td>${supply.cost_per_unit}</td>
                  <td>${supply.reorder_level}</td>
              `;

        // Add click event listener to populate textareas
        row.addEventListener("click", () => {
          descriptionTextarea.value =
            supply.description || "No description available.";
          document.querySelector("#container2-2").style.display = "block"; // Show the details container
        });

        tableBody.appendChild(row);
      });

      // Attach search event listener
      const searchInput = document.querySelector(searchInputId);
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row) => {
          const cells = row.querySelectorAll("td");
          const matches = Array.from(cells).some((cell) =>
            cell.textContent.toLowerCase().includes(query)
          );
          row.style.display = matches ? "" : "none";
        });
      });
    })
    .catch((error) => console.error(`Error fetching ${type} supplies:`, error));
}

// This is for highlighting a row in the table whenever a user clicks an item (pharma-table)
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector(".pharma-table tbody");
  const container = document.querySelector("#container2-1");
  const accordionContent = document.querySelector("#accordion-content-1");

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

// This is for highlighting a row in the table whenever a user clicks an item (surg-table)
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector(".surg-table tbody");
    const container = document.querySelector("#container2-2");
    const accordionContent = document.querySelector("#accordion-content-2");
  
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

  // This is for highlighting a row in the table whenever a user clicks an item (non-surg-table)
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector(".non-surg-table tbody");
    const container = document.querySelector("#container2-3");
    const accordionContent = document.querySelector("#accordion-content-3");
  
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
