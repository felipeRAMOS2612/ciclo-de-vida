export const AuthService = {
    register(user) {
        console.log("usuario ", user);
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.find(u => u.email === user.email)) {
            throw new Error("Ya existe un usuario con ese correo.");
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
    },

    login(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error("Credenciales inválidas");
        console.log("Usuario encontrado:", user);
        const currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            therapist_id: user.therapist_id || null,
            role: user.role || "user"
        };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        return currentUser;
    },

    logout() {
        localStorage.removeItem("currentUser");
    },

    updateProfile(updatedUser) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
        users[index] = {
            ...users[index], 
            ...updatedUser   
        };
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(users[index]));
        }
    },

    recoverPassword(email, newPassword) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.email === email);
        if (!user) throw new Error("Usuario no encontrado");
        user.password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
    }
};