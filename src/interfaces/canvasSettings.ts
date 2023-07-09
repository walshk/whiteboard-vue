import { WhiteboardTool } from '@/enums/whiteboardTool';
export interface CanvasSettings {
	radius: number;
	color: string;
	currentTool: WhiteboardTool;
}
