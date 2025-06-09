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
            document.getElementById("therapistViewItem").style.display = "block";
        }
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            location.href = "home.html";
        });
    });
}

importSidebar();