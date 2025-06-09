import { LifeEvent } from "/types/lifeEvents.js";
import { StorageService } from "/services/storageService.js";
import { Filters } from "/utils/filters.js";
import { CanvasRenderer } from "/ui/canvasRender.js";
import { renderEventList } from "/ui/eventListRender.js";
import { renderLegend } from "/ui/legendRender.js";
import { updateSummary } from "/ui/summaryRender.js";

let events = StorageService.load();
const canvas = new CanvasRenderer("cycleCanvas");

function refreshUI() {
    const filter = document.getElementById("cycleType").value;
    const filtered = Filters.filter(events, filter);
    canvas.draw(filtered);
    renderEventList(filtered, deleteEvent);
    renderLegend(filtered);
    updateSummary(filtered);
}

function deleteEvent(id) {
    events = events.filter(e => e.uid !== id);
    StorageService.save(events);
    refreshUI();
}

refreshUI();

const form = document.getElementById("eventForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const event = new LifeEvent({
        date: document.getElementById("eventDate").value,
        category: document.getElementById("eventCategory").value,
        description: document.getElementById("eventDescription").value,
        color: document.getElementById("eventColor").value,
        uid: Date.now(),
    });
    events.push(event);
    StorageService.save(events);
    form.reset();
    bootstrap.Modal.getInstance(document.getElementById("eventModal")).hide();
    refreshUI();
});

document.getElementById("cycleType").addEventListener("change", refreshUI);