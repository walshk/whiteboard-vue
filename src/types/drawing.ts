import { Point } from './point';

export class Drawing {
	constructor(id: number, radius: number, color?: string) {
		this.id = id;

		this.points = [] as Point[];
		this.radius = radius;
		this.color = color;
	}

	id: number;
	points: Point[];
	radius: number;
	color?: string;

	draw(ctx: CanvasRenderingContext2D): void {
		for (let i = 0; i < this.points.length; i++) {
			this.points[i].render(ctx, this.radius, this.color);
		}
	}

	calculateDistanceFrom(x: number, y: number): number {
		const distance: Function = (
			x1: number,
			x2: number,
			y1: number,
			y2: number
		): number => {
			// euclidean distance
			const a: number = x1 - x2;
			const b: number = y1 - y2;

			return Math.sqrt(a * a + b * b);
		};

		// TODO: implement more efficient search method
		let shortestDistance: number = 0;
		for (let i = 0; i < this.points.length; i++) {
			const point: Point = this.points[i];
			const distanceToPoint: number = distance(x, point.x, y, point.y);

			if (distanceToPoint < shortestDistance) {
				shortestDistance = distanceToPoint;
			}
		}
		return shortestDistance;
	}
}
