let userData = [];
let editingIndex = null;

// Fetch all users
fetch('/api/users')
  .then(res => res.json())
  .then(data => {
    userData = data;
    renderTable();
  });

function renderTable() {
  const tbody = document.querySelector("#editUserTable tbody");
  tbody.innerHTML = "";

  userData.forEach((user, index) => {
    const isEditing = editingIndex === index;
    const row = document.createElement("tr");

    if (isEditing) {
      row.innerHTML = `
        <td><input type="text" id="editDisName" value="${user.DisName}" /></td>
        <td><input type="text" id="editUsername" value="${user.Username}" /></td>
        <td><input type="text" id="editPassword" value="${user.Password}" /></td>
        <td><input type="text" id="editLink" value="${user.link}" /></td>
        <td>
          <button onclick="saveUser(${index})">Save</button>
          <button onclick="cancelEdit()">Cancel</button>
        </td>
      `;
    } else {
      row.innerHTML = `
        <td>${user.DisName}</td>
        <td>${user.Username}</td>
        <td>${user.Password}</td>
        <td>${user.link}</td>
        <td><button onclick="editRow(${index})">Edit</button></td>
      `;
    }

    tbody.appendChild(row);
  });
}

function editRow(index) {
  editingIndex = index;
  renderTable();
}

function cancelEdit() {
  editingIndex = null;
  renderTable();
}

function saveUser(index) {
  const updatedUser = {
    DisName: document.getElementById("editDisName").value,
    Username: document.getElementById("editUsername").value,
    Password: document.getElementById("editPassword").value,
    link: document.getElementById("editLink").value
  };

  fetch(`/api/users/${index}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser)
  })
    .then(res => {
      if (res.ok) {
        userData[index] = updatedUser;
        editingIndex = null;
        renderTable();
        alert("User updated successfully");
      } else {
        alert("Failed to update user");
      }
    })
    .catch(err => {
      console.error("Error updating user:", err);
      alert("Something went wrong");
    });
}
