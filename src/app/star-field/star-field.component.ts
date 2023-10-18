import { state, style, trigger } from '@angular/animations';
import { Component } from '@angular/core';

interface LineData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}

@Component({
  selector: 'app-star-field',
  templateUrl: './star-field.component.html',
  styleUrls: ['./star-field.component.css'],
})
export class StarFieldComponent {
  radius: number = 30;
  strokeWidth: number = 4;
  strokeLineCap: string = 'round';
  lines: LineData[] = [];

  animationDurationMs: number = 700;

  complete: boolean = false;

  get boxDimensions(): number {
    return this.radius * 2;
  }

  ngOnInit(): void {
    // Generate data points for the radial lines
    this.generateDataPoints();
  }

  xAnimateValues(line: LineData): string {
    return `${line.x1};${line.x2}`;
  }

  yAnimateValues(line: LineData): string {
    return `${line.y1};${line.y2}`;
  }

  generateDataPoints() {
    const numPoints = 8; // Number of radial lines
    for (let i = 0; i < numPoints; i++) {
      const angle = (360 / numPoints) * i;
      const radians = (angle * Math.PI) / 180;
      const x1 = this.radius + (this.radius / 3) * Math.cos(radians);
      const y1 = this.radius + (this.radius / 3) * Math.sin(radians);
      const x2 =
        this.radius + (this.radius - this.radius * 0.05) * Math.cos(radians);
      const y2 =
        this.radius + (this.radius - this.radius * 0.05) * Math.sin(radians);
      const color = `hsl(${i * (360 / numPoints)}, 70%, 50%)`; // Color based on angle
      this.lines.push({ x1, y1, x2: x2, y2: y2, color });
    }
  }

  endAnimation(): void {
    this.complete = true;
  }
}
