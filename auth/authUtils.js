export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

export function importSidebar() {
    fetch("../components/sidebar.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("sidebar-container").innerHTML = html;
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) return location.href = "home.html";
        if (user.role === "therapist") {
            document.querySelectorAll(".therapistViewItem").forEach(item => {
                item.style.display = "block";
            });
        }
        const logoutButtons = document.querySelectorAll(".logout");
        logoutButtons.forEach(button => {
            button.addEventListener("click", () => {
                console.log("Cerrando sesión...");
                localStorage.removeItem("currentUser");
                location.href = "home.html";
            });
        });
    });
}

importSidebar();