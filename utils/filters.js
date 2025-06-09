export const Filters = {
    filter(events, type) {
        const now = new Date();
        return events.filter((e) => {
            const date = new Date(e.date);
            if (type === "all") return true;
            if (type === "year") return date.getFullYear() === now.getFullYear();
            if (type === "month") return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
            if (type === "week") {
                const start = new Date(now);
                start.setDate(now.getDate() - now.getDay());
                const end = new Date(start);
                end.setDate(start.getDate() + 6);
                return date >= start && date <= end;
            }
            return false;
        });
    },
};