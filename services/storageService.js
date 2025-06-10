export const LifeEvents = JSON.parse(localStorage.getItem("lifeEvents") || "[]");

export const StorageService = {
    load(userId) {
        const data = JSON.parse(localStorage.getItem("lifeEvents") || "[]");
        return data.filter(e => e.userId === userId);
    },

    add(event) {
        const data = JSON.parse(localStorage.getItem("lifeEvents") || "[]");
        data.push(event);
        localStorage.setItem("lifeEvents", JSON.stringify(data));
        console.log("Evento agregado:", event);
    },

    save(events) {
        localStorage.setItem("lifeEvents", JSON.stringify(events));
        console.log("Eventos guardados:", events);
    },

    delete(eventId) {
        const data = JSON.parse(localStorage.getItem("lifeEvents") || "[]");
        const updatedData = data.filter(e => e.id !== eventId);
        localStorage.setItem("lifeEvents", JSON.stringify(updatedData));
        console.log("Evento eliminado:", eventId);
    }
};