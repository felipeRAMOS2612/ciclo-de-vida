export function renderEventList(events, onDelete, onDetails, showDeleteButton = true) {
    const list = document.getElementById("eventItems");
    list.innerHTML = "";

    if (events.length === 0) {
        const li = document.createElement("li");
        li.className = "list-group-item text-muted";
        li.textContent = "No hay eventos registrados para este periodo.";
        list.appendChild(li);
        return;
    }

    events.forEach((event) => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center event-item";
        item.innerHTML = `
      <span>
        <span class="w-100 d-flex flex-column" style="max-width: 230px">
            <strong>${event.category.toUpperCase()}</strong>
            <p class="mb-1 p-0 text-truncate w-100">${event.description}</p>
        </span>
        <small>${event.date}</small>
      </span>
      <div>
        <span class="badge rounded-pill w-3 h-3" style="background:${event.color};">&nbsp;</span>
        ${showDeleteButton ? '<button class="btn btn-sm btn-outline-danger ms-2">✕</button>' : ''}
      </div>
    `;
        item.addEventListener("click", () => onDetails(event));
        item.querySelector("button")?.addEventListener("click", () => onDelete(event.uid));
        list.appendChild(item);
    });
}