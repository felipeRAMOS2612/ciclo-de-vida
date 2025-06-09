export function renderEventList(events, onDelete) {
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
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        item.innerHTML = `
      <span>
        <span class="w-100 d-flex flex-column" style="max-width: 230px">
            <strong>${event.category.toUpperCase()}</strong>
            <p class="mb-1 p-0 text-truncate w-100">${event.description}</p>
        </span>
        <small>${event.date}</small>
      </span>
      <div>
        <span class="badge rounded-pill" style="background:${event.color};">&nbsp;</span>
        <button class="btn btn-sm btn-outline-danger ms-2">✕</button>
      </div>
    `;
        item.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return;

            const modalBody = document.getElementById("eventDetailBody");
            modalBody.innerHTML = `
                <p><strong>Categoría:</strong> ${event.category}</p>
                <p><strong>Descripción:</strong><br>${event.description}</p>
                <p><strong>Fecha:</strong> ${event.date}</p>
                <p><strong>Color:</strong> <span class="badge" style="background:${event.color};">&nbsp;&nbsp;&nbsp;</span></p>
            `;

            const modal = new bootstrap.Modal(document.getElementById("eventDetailModal"));
            modal.show();
        });
        item.querySelector("button").addEventListener("click", () => onDelete(event.uid));
        list.appendChild(item);
    });
}