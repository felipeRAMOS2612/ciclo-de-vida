import { LifeEvent } from "../models/LifeEvent.js";

const STORAGE_KEY = "lifeEvents";

export const EventService = {
    load() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data).map(e => new LifeEvent(e)) : [];
    },
    save(events) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    },
    add(events, event) {
        const updated = [...events, event];
        this.save(updated);
        return updated;
    },
    delete(events, uid) {
        const updated = events.filter(e => e.uid !== uid);
        this.save(updated);
        return updated;
    }
};
