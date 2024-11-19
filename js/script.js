// Function to toggle the dropdown menu for specific ID
function toggleDropdown(id) {
  // Close all other dropdowns first
  const dropdowns = document.getElementsByClassName("dropdown-content");
  for (let i = 0; i < dropdowns.length; i++) {
    if (dropdowns[i].id !== id) {
      dropdowns[i].classList.remove("show");
    }
  }

  // Toggle the selected dropdown
  const dropdownMenu = document.getElementById(id);
  dropdownMenu.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  // Check if the click was outside the dropdown or not
  if (
    !event.target.closest(".dropdown-toggle") &&
    !event.target.closest(".dropdown-content")
  ) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
};

const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;

    // Close all other accordion items
    document.querySelectorAll(".accordion-content").forEach((item) => {
      if (item !== content) {
        item.style.maxHeight = null; // Close other accordion items
      }
    });

    // Toggle the clicked accordion item
    if (content.style.maxHeight) {
      content.style.maxHeight = null; // Close the clicked accordion
    } else {
      content.style.maxHeight = content.scrollHeight + "px"; // Open the clicked accordion
    }
  });
});

// --- Phone Number Validation ---
const phoneInput = document.getElementById("phone-input");
if (phoneInput) {
  phoneInput.addEventListener("keypress", function (event) {
    const char = String.fromCharCode(event.which);
    if (!/^[0-9]*$/.test(char)) {
      event.preventDefault();
      return;
    }

    const phoneNumberWithoutCountryCode = phoneInput.value.slice(0);
    if (phoneNumberWithoutCountryCode.length === 0 && char === "0") {
      event.preventDefault();
    }
  });

  phoneInput.addEventListener("input", function () {
    const phoneNumberWithoutCountryCode = phoneInput.value.slice(3);
    if (phoneNumberWithoutCountryCode.length > 10) {
      phoneInput.value = "+63" + phoneNumberWithoutCountryCode.slice(0, 10);
    }
  });
}

// Relationship Options
const relationshipSelect = document.getElementById("relationship");
const otherRelationshipInput = document.getElementById("other-relationship");
const otherRelationshipLabel = document.getElementById(
  "other-relationship-label"
);

// get the relationship (select) and minimize it to fit in the column
const otherInput = document.getElementById("relationship");

if (relationshipSelect && otherRelationshipInput && otherRelationshipLabel) {
  relationshipSelect.addEventListener("change", function () {
    if (relationshipSelect.value === "Other") {
      otherRelationshipInput.disabled = false;
      otherRelationshipLabel.disabled = false;
      otherRelationshipLabel.style.display = "block";
      otherRelationshipInput.style.display = "block";
    } else {
      otherRelationshipInput.disabled = true;
      otherRelationshipInput.style.display = "none";
      otherRelationshipLabel.style.display = "none";
      otherRelationshipInput.value = "";
    }
  });

  // Ensure the input is properly set when the page reloads
  window.addEventListener("DOMContentLoaded", function () {
    if (relationshipSelect.value === "Other") {
      otherRelationshipInput.disabled = false;
      otherRelationshipLabel.disabled = false;
      otherRelationshipLabel.style.display = "block";
      otherRelationshipInput.style.display = "block"; // Show the input if "Other" is selected
    } else {
      otherRelationshipInput.disabled = true;
      otherRelationshipLabel.style.display = "none";
      otherRelationshipInput.style.display = "none"; // Hide the input if not "Other"
      otherRelationshipInput.value = ""; // Clear the input field if not "Other"
    }
  });
}

// Examination Options
const patientExaminationRadios = document.getElementsByName("examination");
const inPatientRadioContainer = document.getElementById("in-patient");
const outPatientContainer = document.getElementById("out-patient");

// Helper function to update container visibility
function updateContainerVisibility() {
  // Ensure the containers exist before proceeding
  if (!inPatientRadioContainer || !outPatientContainer) {
    console.warn("Some containers are not present on this page.");
    return;
  }

  // Find the selected radio button
  const selectedRadio = Array.from(patientExaminationRadios).find(
    (radio) => radio.checked
  );

  if (selectedRadio) {
    if (selectedRadio.value === "Out-Patient") {
      outPatientContainer.style.display = "flex";
      inPatientRadioContainer.style.display = "none";
    } else if (selectedRadio.value === "In-Patient") {
      outPatientContainer.style.display = "none";
      inPatientRadioContainer.style.display = "flex";
    } else if (selectedRadio.value === "Discharge") {
      outPatientContainer.style.display = "none";
      inPatientRadioContainer.style.display = "none";
    }
  } else {
    // If no radio button is selected, hide both containers
    outPatientContainer.style.display = "none";
    inPatientRadioContainer.style.display = "none";
  }
}

// Attach event listeners to radio buttons
if (patientExaminationRadios.length > 0) {
  patientExaminationRadios.forEach((radio) => {
    radio.addEventListener("change", updateContainerVisibility);
  });

  // Ensure the containers are properly set when the page reloads
  window.addEventListener("DOMContentLoaded", updateContainerVisibility);
} else {
  console.warn("No radio buttons found with the name 'examination'.");
}

// This is for highligting a row in the table whenever user clicks an item (pharma-table)
document.querySelectorAll(".pharma-table tbody tr").forEach((row) => {
  row.addEventListener("click", function () {
    // Remove 'selected' class from all rows
    document.querySelectorAll(".pharma-table tbody tr").forEach((r) => {
      r.classList.remove("selected");
    });

    // Add 'selected' class to the clicked row
    this.classList.add("selected");
  });
});

// This is for highligting a row in the table whenever user clicks an item (surg-table)
document.querySelectorAll(".surg-table tbody tr").forEach((row) => {
  row.addEventListener("click", function () {
    // Remove 'selected' class from all rows
    document.querySelectorAll(".surg-table tbody tr").forEach((r) => {
      r.classList.remove("selected");
    });

    // Add 'selected' class to the clicked row
    this.classList.add("selected");
  });
});

// This is for highligting a row in the table whenever user clicks an item (non-surg-table)
document.querySelectorAll(".non-surg-table tbody tr").forEach((row) => {
  row.addEventListener("click", function () {
    // Remove 'selected' class from all rows
    document.querySelectorAll(".non-surg-table tbody tr").forEach((r) => {
      r.classList.remove("selected");
    });

    // Add 'selected' class to the clicked row
    this.classList.add("selected");
  });
});

// This is for highligting a row in the table whenever user clicks an item (supplier-table)
document.querySelectorAll(".patient-table tbody tr").forEach((row) => {
  row.addEventListener("click", function () {
    // Remove 'selected' class from all rows
    document.querySelectorAll(".patient-table tbody tr").forEach((r) => {
      r.classList.remove("selected");
    });

    // Add 'selected' class to the clicked row
    this.classList.add("selected");
  });
});

// This is for highligting a row in the table whenever user clicks an item (supplier-table)
document.querySelectorAll(".supplier-table tbody tr").forEach((row) => {
  row.addEventListener("click", function () {
    // Remove 'selected' class from all rows
    document.querySelectorAll(".supplier-table tbody tr").forEach((r) => {
      r.classList.remove("selected");
    });

    // Add 'selected' class to the clicked row
    this.classList.add("selected");
  });
});

// This is for highligting a row in the table whenever user clicks an item (qualification-table)
document.querySelectorAll(".qualification-table tbody tr").forEach((row) => {
    row.addEventListener("click", function () {
      // Remove 'selected' class from all rows
      document.querySelectorAll(".qualification-table tbody tr").forEach((r) => {
        r.classList.remove("selected");
      });
  
      // Add 'selected' class to the clicked row
      this.classList.add("selected");
    });
  });
  
