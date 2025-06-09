export class LifeEvent {
    constructor({ date, category, description, color, uid, userId }) {
        this.date = date;
        this.category = category;
        this.description = description;
        this.color = color;
        this.uid = uid;
        this.userId = userId;
    }
}