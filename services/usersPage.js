import { getCurrentUser, logout } from "../auth/authService.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();
  if (!user || user.role !== "therapist") {
    alert("Acceso no autorizado");
    location.href = "login.html";
    return;
  }

  const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const patients = allUsers.filter(u => u.therapist_id === user.id && u.role === "patient");

  const table = document.getElementById("usersTable");
  patients.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.email}</td>
      <td>
        <a href="patient-events.html?userId=${p.id}" class="btn btn-sm btn-primary">Ver eventos</a>
      </td>
    `;
    table.appendChild(row);
  });
});
