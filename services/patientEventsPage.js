import { getCurrentUser } from "../auth/authService.js";
import { renderEventList } from "../ui/eventListRenderer.js";

document.addEventListener("DOMContentLoaded", () => {
  const therapist = getCurrentUser();
  if (!therapist || therapist.role !== "therapist") {
    alert("Acceso no autorizado");
    location.href = "login.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");
  if (!userId) {
    alert("Paciente no especificado");
    return;
  }

  const allEvents = JSON.parse(localStorage.getItem("lifeEvents") || "[]");
  const patientEvents = allEvents.filter(e => e.userId === userId);
  renderEventList(patientEvents, () => {}); // sin botón de eliminar
});
