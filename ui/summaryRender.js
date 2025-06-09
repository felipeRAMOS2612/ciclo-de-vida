export function updateSummary(events) {
    const summary = document.getElementById("summary");
    if (events.length === 0) {
        summary.innerHTML = "<em>No hay datos para este periodo.</em>";
        return;
    }
    const counts = {};
    events.forEach((e) => {
        counts[e.category] = (counts[e.category] || 0) + 1;
    });
    const most = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    summary.innerHTML = `<strong>${events.length}</strong> eventos registrados<br>Categoría más frecuente: <strong>${most[0]}</strong>`;
}