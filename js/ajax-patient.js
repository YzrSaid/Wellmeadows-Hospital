$(document).ready(function () {
  $("#add-patient-btn").click(function () {
    // Collect form data
    let patientData = {
      first_name: $("#first_name").val(),
      last_name: $("#last_name").val(),
      address: $("#address").val(),
      phone_num: $("#phone-input").val(),
      gender: $("#gender").val(),
      date_of_birth: $("#date-of-birth").val(),
      m_status: $("#marital-status").val(),
      clinic_num: $("#clinic-num").val(),
    };

    // Simple client-side validation
    if (
      !patientData.first_name ||
      !patientData.last_name ||
      !patientData.phone_num
    ) {
      alert("Please fill out all required fields in the patient form.");
      return;
    }

    // AJAX request to add patient and get `patient_num`
    $.ajax({
      url: "../data-submissions/submission-form-patients.php", // PHP endpoint
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ patient: patientData }),
      dataType: "json",
      success: function (response) {
        if (response.success) {
          // Get the returned `patient_num`
          let patient_num = response.patient_num;

          // Add Next-of-Kin
          let kinData = {
            first_name: $("#first-name").val(),
            last_name: $("#last-name").val(),
            address: $("#kin-address").val(),
            relationship: $("#relationship").val(),
            phone_num: $("#kin-phone-input").val(),
            patient_num: patient_num, // Use the returned `patient_num`
          };

          // Add Appointment
          let appointmentData = {
            patient_num: patient_num, // Use the returned `patient_num`
            date_of_exam: $("#appointment-date").val(),
            time_of_exam: $("#appointment-time").val(),
            exam_room: $("#exam-room").val(),
            staff_num: $("#staff").val(),
          };

          // Validate and send Next-of-Kin data
          if (kinData.first_name && kinData.relationship) {
            $.ajax({
              url: "../data-submissions/submission-form.php",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify({ next_of_kin: kinData }),
              dataType: "json",
              success: function (kinResponse) {
                if (!kinResponse.success) {
                  alert("Error adding next-of-kin: " + kinResponse.message);
                }
              },
              error: function () {
                alert("An error occurred adding next-of-kin.");
              },
            });
          }

          // Validate and send Appointment data
          if (appointmentData.date_of_exam) {
            $.ajax({
              url: "../data-submissions/submission-form.php",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify({ appointment: appointmentData }),
              dataType: "json",
              success: function (appointmentResponse) {
                if (!appointmentResponse.success) {
                  alert(
                    "Error adding appointment: " + appointmentResponse.message
                  );
                }
              },
              error: function () {
                alert("An error occurred adding the appointment.");
              },
            });
          }

          alert("Patient, Next-of-Kin, and Appointment added successfully!");
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
  });

  $("#clear-btn").click(function () {
    $("input, select").val("");
  });
});



// This is for highlighting a row in the table whenever a user clicks an item (patient-table)
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector(".patient-table tbody");
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

        // Show the container (edit form)
        if (accordionContent) {
          accordionContent.style.maxHeight = "fit-content";
        }
        if (container) {
          container.style.display = "block";
        }

        // Get patient_num from data attribute
        const patientNum = row.dataset.patientNum;  // Make sure patient_num is set in the row's data attribute

        // Load patient data
        loadPatientData(patientNum);
      }
    });
  }


  
  // INSERTING PATIENT DATA IN THE TABLE
  const insertPatientIntoTable = (patient) => {
    console.log('Inserting patient:', patient);
    const tableBody = document.querySelector('.patient-table tbody');
    const row = document.createElement('tr');
    row.classList.add('patient-row');
    row.dataset.patientNum = patient.patient_num;
  
    row.innerHTML = `
      <td>${patient.patient_num}</td>
      <td>${patient.full_name}</td>
      <td>${patient.gender}</td>
      <td>${patient.address}</td>
      <td>${patient.m_status}</td>
      <td>${patient.phone_num}</td>
      <td>${patient.date_of_birth}</td>
      <td>${patient.date_registered}</td>
      <td>${patient.next_of_kin_name}</td>
    `;
  
    row.addEventListener('click', () => {
      loadPatientData(patient.patient_num);
    });
  
    tableBody.appendChild(row);
  };
  
  
  // FETCHING DATA FROM DATABASE
  fetch('../php-fetch-forms/fetch-patients.php')
   .then(response => response.json())
   .then(data => {
       console.log('Fetched Data:', data);
       if (data && Array.isArray(data)) {
         data.forEach(patient => insertPatientIntoTable(patient));
       } else {
         console.error('Invalid data format');
       }
   })
   .catch(error => console.error('Error fetching patients:', error));

  

// INSERTING DATA IN EDIT FORM 
const loadPatientData = (patientNum) => {
  fetch(`../php-fetch-forms/fetch-patients-edit.php?patient_num=${patientNum}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);  // Log the response to check if it's correct

      if (data.error) {
        console.error(data.error);
      } else {
        // Fill patient information in the form
        document.getElementById("patient-number").value = data.patient.patient_num || ''; // Check for undefined
        document.getElementById("first-name").value = data.patient.first_name || ''; 
        document.getElementById("last-name").value = data.patient.last_name || ''; 
        document.getElementById("address").value = data.patient.address || ''; 
        document.getElementById("tel-number").value = data.patient.phone_num || ''; 
        document.getElementById("sex").value = data.patient.gender || ''; 
        document.getElementById("dob").value = data.patient.date_of_birth || ''; 
        document.getElementById("marital-status").value = data.patient.m_status || ''; 

        // Set current date for Date Registered (non-editable)
        document.getElementById("date-registered").value = new Date().toISOString().split('T')[0]; // Current date
        document.getElementById("date-registered").setAttribute("readonly", "true");  // Make it readonly

        // Fill next-of-kin information
        const nextOfKin = data.next_of_kin ? `${data.next_of_kin.first_name} ${data.next_of_kin.last_name} (${data.next_of_kin.relationship})` : "N/A";
        document.getElementById("next-of-kin").value = nextOfKin;

        // Make next-of-kin readonly
        document.getElementById("next-of-kin").setAttribute("readonly", "true");
      }
    })
    .catch((error) => console.error("Error fetching patient data:", error));
};




// UPDATE FUNCTION IN EDIT FORM 
const editBtn = document.getElementById("conduct-appointment-btn");
if (editBtn) {
  editBtn.addEventListener("click", (event) => {
    // Prevent form submission
    event.preventDefault();

    // Check if the required fields are filled
    const patientNum = document.getElementById("patient-number").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const address = document.getElementById("address").value;
    const telNumber = document.getElementById("tel-number").value;
    const sex = document.getElementById("sex").value;
    const dob = document.getElementById("dob").value;
    const maritalStatus = document.getElementById("marital-status").value;
    const nextOfKin = document.getElementById("next-of-kin").value; // Add this line

    if (!firstName || !lastName || !address || !telNumber || !sex || !dob || !maritalStatus) {
      alert("Please fill all the required fields!");
      return; // Prevent form submission
    }

    // Collect data for submission if all fields are filled
    const patientData = {
      patient_num: patientNum,
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone_num: telNumber,
      gender: sex,
      date_of_birth: dob,
      m_status: maritalStatus,
      date_registered: document.getElementById("date-registered").value,
      next_of_kin: nextOfKin, // Include Next-of-Kin here
    };

    // Perform the data update request
    fetch('../data-submissions/submission-form-update-patient.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Patient data updated successfully!");

        // Dynamically update the table row with the updated data
        updatePatientRow(patientData);

        // Close the form after successful update
        closeEditForm();
      } else {
        alert("Failed to update patient data.");
      }
    })
    .catch((error) => console.error("Error updating patient data:", error));
  });
}


// UPDATE THE TABLE WITH THE EDITED DATA
const updatePatientRow = (updatedData) => {
  const row = document.querySelector(`tr[data-patient-num="${updatedData.patient_num}"]`);

  if (row) {
    // Update each cell with the updated data based on the correct column order
    row.cells[0].textContent = updatedData.patient_num; // Patient #
    row.cells[1].textContent = `${updatedData.first_name} ${updatedData.last_name}`; // Patient Name
    row.cells[2].textContent = updatedData.gender; // Sex
    row.cells[3].textContent = updatedData.address; // Address
    row.cells[4].textContent = updatedData.m_status; // Marital Status
    row.cells[5].textContent = updatedData.phone_num; // Tel. Number
    row.cells[6].textContent = updatedData.date_of_birth; // Date of Birth
    row.cells[7].textContent = updatedData.date_registered; // Date Registered

    // Set Next-of-Kin to the correct value
    const nextOfKin = updatedData.next_of_kin || "N/A";
    row.cells[8].textContent = nextOfKin; // Next-of-Kin (Assumed value if available)
  }
};

// Function to close the edit form
const closeEditForm = () => {
  const editForm = document.getElementById("edit-form");
  if (editForm) {
    editForm.style.display = "none"; // or use any other method to hide the form, such as modal closing
  }
};
});




// SEARCH AND SORT FUNCTION
document.addEventListener('DOMContentLoaded', function() {
  // Ensure everything is loaded before attaching search and sort functionality
  attachSearchAndSort();
});

function attachSearchAndSort() {
  const tableBody = document.querySelector('.patient-table tbody');
  
  // Attach search event listener
  const searchInput = document.querySelector('.search-input');
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const rows = tableBody.querySelectorAll("tr");
    let hasMatch = false;

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const matches = Array.from(cells).some((cell) =>
        cell.textContent.toLowerCase().includes(query)
      );
      if (matches) {
        row.style.display = ""; // Show matching rows
        hasMatch = true;
      } else {
        row.style.display = "none"; // Hide non-matching rows
      }
    });

    // Show or hide the "No patients available" row
    let noPatientRow = tableBody.querySelector(".no-patient-row");
    if (!noPatientRow) {
      noPatientRow = document.createElement("tr");
      noPatientRow.classList.add("no-patient-row");
      noPatientRow.innerHTML = `<td colspan="9" style="text-align: center; padding: 10px;">No patients available</td>`;
      tableBody.appendChild(noPatientRow);
    }

    // Toggle the visibility of the "No patients available" row
    if (hasMatch) {
      noPatientRow.style.display = "none"; // Hide the "No patients available" row if there are matches
    } else {
      noPatientRow.style.display = ""; // Show the "No patients available" row if no matches
    }
  });

  // Attach sort event listener
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const sortBy = this.value;
      const rows = Array.from(tableBody.querySelectorAll("tr"));

      let sortedRows;

      switch (sortBy) {
        case "patient-number":
          sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector("td:nth-child(1)") ? a.querySelector("td:nth-child(1)").textContent.trim() : '';
            const bValue = b.querySelector("td:nth-child(1)") ? b.querySelector("td:nth-child(1)").textContent.trim() : '';
            return parseInt(aValue) - parseInt(bValue); // Sorting numerically for patient number
          });
          break;
        case "patient-name":
          sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector("td:nth-child(2)") ? a.querySelector("td:nth-child(2)").textContent.trim() : '';
            const bValue = b.querySelector("td:nth-child(2)") ? b.querySelector("td:nth-child(2)").textContent.trim() : '';
            return aValue.localeCompare(bValue); // Sorting alphabetically for patient name
          });
          break;
        case "patient-sex":
          sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector("td:nth-child(3)") ? a.querySelector("td:nth-child(3)").textContent.trim() : '';
            const bValue = b.querySelector("td:nth-child(3)") ? b.querySelector("td:nth-child(3)").textContent.trim() : '';
            return aValue.localeCompare(bValue); // Sorting alphabetically for gender
          });
          break;
        case "patient-addr":
          sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector("td:nth-child(4)") ? a.querySelector("td:nth-child(4)").textContent.trim() : '';
            const bValue = b.querySelector("td:nth-child(4)") ? b.querySelector("td:nth-child(4)").textContent.trim() : '';
            return aValue.localeCompare(bValue); // Sorting alphabetically for address
          });
          break;
        case "patient-marital-status":
          sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector("td:nth-child(5)") ? a.querySelector("td:nth-child(5)").textContent.trim() : '';
            const bValue = b.querySelector("td:nth-child(5)") ? b.querySelector("td:nth-child(5)").textContent.trim() : '';
            return aValue.localeCompare(bValue); // Sorting alphabetically for marital status
          });
          break;
        case "patient-tel-num":
          sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector("td:nth-child(6)") ? a.querySelector("td:nth-child(6)").textContent.trim() : '';
            const bValue = b.querySelector("td:nth-child(6)") ? b.querySelector("td:nth-child(6)").textContent.trim() : '';
            return aValue.localeCompare(bValue); // Sorting alphabetically for phone number
          });
          break;
        case "patient-dob":
          sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector("td:nth-child(7)") ? a.querySelector("td:nth-child(7)").textContent.trim() : '';
            const bValue = b.querySelector("td:nth-child(7)") ? b.querySelector("td:nth-child(7)").textContent.trim() : '';
            return new Date(aValue) - new Date(bValue); // Sorting by Date of Birth
          });
          break;
        case "date-registered":
          sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector("td:nth-child(8)") ? a.querySelector("td:nth-child(8)").textContent.trim() : '';
            const bValue = b.querySelector("td:nth-child(8)") ? b.querySelector("td:nth-child(8)").textContent.trim() : '';
            return new Date(aValue) - new Date(bValue); // Sorting by Date Registered
          });
          break;
        case "next-of-kin":
          sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector("td:nth-child(9)") ? a.querySelector("td:nth-child(9)").textContent.trim() : '';
            const bValue = b.querySelector("td:nth-child(9)") ? b.querySelector("td:nth-child(9)").textContent.trim() : '';
            return aValue.localeCompare(bValue); // Sorting alphabetically for next of kin
          });
          break;
        default:
          sortedRows = rows; // If no sort option is selected, just return the rows as they are
      }

      // Reinsert sorted rows into the table body
      sortedRows.forEach(row => tableBody.appendChild(row)); 
    });
  }
}




