// Fetch and render table data
fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector("#userTable tbody");
        data.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.DisName}</td>
                <td>${user.Username}</td>
                <td>${user.Password}</td>
                <td>${user.link}</td>
            `;
            tbody.appendChild(row);
        });
    });

// Sort table columns
function sortTable(colIndex) {
    const table = document.getElementById("userTable");
    let switching = true, dir = "asc", switchcount = 0;
    while (switching) {
        switching = false;
        let rows = table.rows;
        for (let i = 1; i < rows.length - 1; i++) {
            let x = rows[i].getElementsByTagName("TD")[colIndex];
            let y = rows[i + 1].getElementsByTagName("TD")[colIndex];
            let shouldSwitch = false;
            if ((dir === "asc" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) ||
                (dir === "desc" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// Search box filter
function filterTable() {
    const input = document.getElementById("searchBox");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("userTable");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        let match = false;

        for (let j = 0; j < cells.length - 1; j++) {
            if (cells[j].textContent.toLowerCase().includes(filter)) {
                match = true;
                break;
            }
        }

        row.style.display = match ? "" : "none";
    }
}
// post 
document.getElementById("addUserForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const newUser = {
        DisName: document.getElementById("newName").value.trim(),
        Username: document.getElementById("newUsername").value.trim(),
        Password: document.getElementById("newPassword").value.trim(),
        link: document.getElementById("newLink").value.trim()
    };

    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })
    .then(res => {
        if (res.ok) {
            // Add to table without reload
            const tbody = document.querySelector("#userTable tbody");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${newUser.DisName}</td>
                <td>${newUser.Username}</td>
                <td>${newUser.Password}</td>
                <td>${newUser.link}</td>
            `;
            tbody.appendChild(row);
            document.getElementById("addUserForm").reset();
        }
    });
});
//edit 
