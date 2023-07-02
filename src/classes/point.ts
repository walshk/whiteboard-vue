export class Point {
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	x: number;
	y: number;

	render(ctx: CanvasRenderingContext2D, radius: number, color?: string): void {
		ctx.fillStyle = color ?? 'black';
		ctx.beginPath();
		ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
		ctx.fill();
	}
}
