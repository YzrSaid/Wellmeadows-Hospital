$(document).ready(function () {
  // Fetch and display work experiences on page load
  function fetchWorkExperiences() {
    $.ajax({
      url: "../data-submissions/submission-work-exp.php",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ action: "fetch" }),
      dataType: "json",
      success: function (response) {
        if (response.success) {
          populateTable(response.data);
        } else {
          alert(response.message);
        }
      },
    });
  }

  // Populate table with work experience data
  function populateTable(data) {
    const tableBody = $(".work-experience-table tbody");
    tableBody.empty();

    data.forEach((item) => {
      tableBody.append(`
              <tr>
                  <td>${item.experience_id}</td>
                  <td>${item.staff_num}</td>
                  <td>${item.name_of_org}</td>
                  <td>${item.position}</td>
                  <td>${item.start_date}</td>
                  <td>${item.end_date}</td>
              </tr>
          `);
    });
  }

  // Add a new work experience
  $("#add-work-exp-btn").click(function () {
    const workExperience = {
      staff_num: $("#staff-number").val(),
      name_of_org: $("#name-of-org").val(),
      position: $("#position").val(),
      start_date: $("#start-of-date").val(),
      end_date: $("#end-of-date").val(),
    };

    $.ajax({
      url: "../data-submissions/submission-work-exp.php",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ work_experience: workExperience }),
      dataType: "json",
      success: function (response) {
        if (response.success) {
          alert(response.message);
          fetchWorkExperiences(); // Refresh table
        } else {
          alert(response.message);
        }
      },
    });
  });

  // Search and sort work experiences
  $(".search-btn").click(function () {
    const searchTerm = $(".search-input").val();
    const sortColumn = $("#sort-select").val();

    $.ajax({
      url: "../data-submissions/submission-work-exp.php",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ action: "search_sort", searchTerm, sortColumn }),
      dataType: "json",
      success: function (response) {
        if (response.success) {
          populateTable(response.data);
        } else {
          alert(response.message);
        }
      },
    });
  });

  // Initialize table data
  fetchWorkExperiences();
});

// This is for highlighting a row in the table whenever a user clicks an item (patient-table)
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector(".work-experience-table tbody");
  const container = document.querySelector(".container2");
  const accordionContent = document.querySelector("#accordion-content-edit");

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
