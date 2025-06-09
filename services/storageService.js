export const StorageService = {
    load(userId) {
        const data = localStorage.getItem("lifeEvents") || "[]";
        return JSON.parse(data).filter(e => e.userId === userId);
    },

    save(events) {
        localStorage.setItem("lifeEvents", JSON.stringify(events));
    },

    delete(events, uid) {
        const updated = events.filter(e => e.uid !== uid);
        this.save(updated);
        return updated;
    }
};