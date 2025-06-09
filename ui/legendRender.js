export function renderLegend(events) {
    const legend = document.getElementById("legend");
    const categories = {};
    events.forEach((e) => {
        if (!categories[e.category]) categories[e.category] = e.color;
    });
    legend.innerHTML = Object.entries(categories).map(([cat, color]) => `<span class="badge me-2" style="background:${color}">${cat}</span>`).join("");
}