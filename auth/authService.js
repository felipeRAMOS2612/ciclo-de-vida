export const AuthService = {
    users: JSON.parse(localStorage.getItem("users")) || [
        {
            id: 1,
            name: "Juan Pérez",
            email: "juan@example.com",
            password: "12345678",
            therapist_id: 2,
            role: "user"
        },
        {
            id: 2,
            name: "Ana López",
            email: "ana@example.com",
            password: "password123",
            therapist_id: null,
            role: "therapist"
        }
    ],
    
    register(user) {
        if (this.users.find(u => u.email === user.email)) {
            throw new Error("Ya existe un usuario con ese correo.");
        }
        user.id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
        this.users.push(user);
        localStorage.setItem("users", JSON.stringify(this.users));
        console.log("Usuarios actualizados:", this.users);
    },

    login(email, password) {
        let user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            user = JSON.parse(localStorage.getItem("users")).find(u => u.email === email && u.password === password);
            if (!user) {
                throw new Error("Credenciales inválidas.");
            }
        };
        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
    },

    logout() {
        localStorage.removeItem("currentUser");
    },

    updateProfile(updatedUser) {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
            this.users[index] = {
                ...this.users[index],
                ...updatedUser
            };

            localStorage.setItem("users", JSON.stringify(this.users));
            localStorage.setItem("currentUser", JSON.stringify(this.users[index]));

            console.log("Perfil actualizado:", this.users[index]);
        } else {
            console.error("Usuario no encontrado para actualizar.");
        }
    }
};