export class CanvasRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.positions = [];
    }

    draw(events) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        const radius = 150;
        this.positions = [];

        if (events.length === 0) return;

        const angleSize = (2 * Math.PI) / events.length;
        let start = 0;

        events.forEach((event) => {
            const end = start + angleSize;
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy);
            this.ctx.arc(cx, cy, radius, start, end);
            this.ctx.closePath();
            this.ctx.fillStyle = event.color;
            this.ctx.fill();

            this.positions.push({ startAngle: start, endAngle: end, radius, centerX: cx, centerY: cy, event });
            start = end;
        });

        this.canvas.onmousemove = (e) => {
            const { left, top } = this.canvas.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            const dx = x - cx;
            const dy = y - cy;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);
            const angle = Math.atan2(dy, dx);
            const normalized = angle >= 0 ? angle : 2 * Math.PI + angle;
            this.canvas.title = "";

            for (const pos of this.positions) {
                if (distance <= pos.radius && normalized >= pos.startAngle && normalized < pos.endAngle) {
                    this.canvas.title = `${pos.event.category.toUpperCase()} - ${pos.event.description}\n${pos.event.date}`;
                    break;
                }
            }
        };
    }
}