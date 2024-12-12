document.addEventListener('DOMContentLoaded', function () {
  console.log('JavaScript Loaded'); // Log to confirm JS is running

  // Function to fetch and populate dropdown data
  function fetchDropdownData(action, selectId) {
      fetch(`../php-fetch-forms/fetch-requisitions.php?action=${action}`)
          .then(response => response.json())
          .then(data => {
              const select = document.getElementById(selectId);
              if (!select) return;

              if (Array.isArray(data)) {
                  data.forEach(item => {
                      const option = document.createElement('option');
                      option.value = item.id || item.staff_num || item.ward_num;
                      option.textContent = item.drug_name || item.name || item.ward_name || item.item_name;
                      select.appendChild(option);
                  });
              }
          })
          .catch(error => console.error(`Error fetching ${action}:`, error));
  }

  // Function to fetch requisitions for acceptance
  function fetchRequisitionsForAcceptance() {
      console.log('Fetching requisitions for acceptance...');
      fetch('../php-fetch-forms/fetch-requisitions.php?action=getRequisitions')
          .then(response => response.json())
          .then(data => {
              console.log('Fetched requisitions:', data);
              const acceptRequisitionList = document.querySelector('.delivered-requisition-list');
              acceptRequisitionList.innerHTML = '';
              if (Array.isArray(data)) {
                  data.forEach(requisition => {
                      const button = document.createElement('button');
                      button.textContent = `Requisition Nbr/Staff/Ward: ${requisition.requisition_id}/${requisition.first_name} ${requisition.last_name}/${requisition.ward_name} | ${requisition.created_at}`;
                      button.setAttribute('data-requisition-id', requisition.requisition_id);
                      console.log('Created button for requisition:', requisition.requisition_id);
                      button.addEventListener('click', function() {
                          console.log('Button clicked for requisition:', requisition.requisition_id);
                          fetchRequisitionItems(requisition.requisition_id);
                      });
                      acceptRequisitionList.appendChild(button);
                  });
              }
          })
          .catch(error => console.error('Error fetching requisitions:', error));
  }

  // Function to fetch items for a specific requisition
  function fetchRequisitionItems(requisitionId) {
      console.log('Fetching items for requisition:', requisitionId);
      fetch(`../php-fetch-forms/fetch-requisitions.php?action=getRequisitionItems&requisition_id=${requisitionId}`)
          .then(response => response.json())
          .then(data => {
              console.log('Fetched items:', data);
              const requisitionItemsList = document.querySelector('.requisition-items-list');
              requisitionItemsList.innerHTML = '';
              if (Array.isArray(data)) {
                  data.forEach(item => {
                      const listItem = document.createElement('li');
                      listItem.textContent = `${item.drug_name} - ${item.quantity}`;
                      requisitionItemsList.appendChild(listItem);
                  });
              }
          })
          .catch(error => console.error('Error fetching requisition items:', error));
  }

  // Fetch dropdown data
  fetchDropdownData('getPharmaceuticalSupplies', 'drug-options');
  fetchDropdownData('getNonSurgicalSupplies', 'drug-options');
  fetchDropdownData('getSurgicalSupplies', 'drug-options');
  fetchDropdownData('getStaff', 'staff');
  fetchDropdownData('getWards', 'ward');

  // Fetch requisitions for acceptance
  fetchRequisitionsForAcceptance();
});
