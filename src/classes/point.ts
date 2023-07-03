export class Point {
	constructor(x: number, y: number, viewWidth: number, viewHeight: number) {
		this.x = x;
		this.y = y;
		this.viewWidth = viewWidth;
		this.viewHeight = viewHeight;
	}

	x: number;
	y: number;

	viewWidth: number;
	viewHeight: number;

	render(ctx: CanvasRenderingContext2D, radius: number, color?: string): void {
		const { width, height } = ctx.canvas.getBoundingClientRect();
		if (width !== this.viewWidth) {
			this.resizeWidth(width);
		}
		if (height !== this.viewHeight) {
			this.resizeHeight(height);
		}

		ctx.fillStyle = color ?? 'black';
		ctx.beginPath();
		ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
		ctx.fill();
	}

	resizeWidth(newWidth: number): void {
		const ratio = this.x / this.viewWidth;
		this.x = ratio * newWidth;
		this.viewWidth = newWidth;
	}

	resizeHeight(newHeight: number): void {
		const ratio = this.y / this.viewHeight;
		this.y = ratio * newHeight;
		this.viewHeight = newHeight;
	}
}
