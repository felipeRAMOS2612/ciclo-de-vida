import { getCurrentUser } from "../auth/authUtils.js";
import { renderEventList } from "../ui/eventListRender.js";
import { LifeEvents } from "../services/storageService.js";

document.addEventListener("DOMContentLoaded", () => {
  const therapist = getCurrentUser();
  if (!therapist || therapist.role !== "therapist") {
    alert("Acceso no autorizado");
    location.href = "/pages/home";
    return;
  }
  console.log("Cargando eventos del paciente...", LifeEvents);
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");
  if (!userId) {
    alert("Paciente no especificado");
    return;
  }

  const patientEvents = LifeEvents.filter(e => e.userId === +userId);
  renderEventList(patientEvents, () => {}, () => {}, false);
});
