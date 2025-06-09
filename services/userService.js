export const updateTherapistId = (userId, therapistId) => {
    document.addEventListener("DOMContentLoaded", () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) return location.href = "login.html";
        
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("therapistId").value = user.therapist_id || "";
    });
}