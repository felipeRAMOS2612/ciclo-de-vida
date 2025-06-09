import { AuthService } from "../auth/authService.js";
import { getCurrentUser } from "../auth/authUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();
  if (!user || user.role !== "therapist") {
    alert("Acceso no autorizado");
    location.href = "login.html";
    return;
  }
  const patients = AuthService.users.filter(u => u.therapist_id === user.id && u.role === "user");

  const table = document.getElementById("usersTable");
  patients.forEach(paciente => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${paciente.name}</td>
      <td>${paciente.email}</td>
      <td>
        <a href="patient-events.html?userId=${paciente.id}" class="btn btn-sm btn-primary">Ver eventos</a>
      </td>
    `;
    table.appendChild(row);
  });
});