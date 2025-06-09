export const StorageService = {
    load() {
        const data = localStorage.getItem("lifeEvents") || "[]";
        return JSON.parse(data);
    },

    save(events) {
        localStorage.setItem("lifeEvents", JSON.stringify(events));
    },

    delete(events, uid) {
        const updated = events.filter(event => event.uid !== uid);
        this.save(updated);
        return updated;
    }
};