import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  imagesMap = new Map<string, any>();
  areAllImagesLoaded = false;

  constructor() {
    const image = new Image(60, 45);
    image.onload = () => {
      this.imagesMap.get('bozo').isLoaded = true;
      this.areAllImagesLoaded = Array.from(this.imagesMap.values()).every(
        (f) => f.isLoaded
      );
    };
    image.src =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgPGEgeGxpbms6aHJlZj0iaHR0cDovL3d3dy50YnJheS5vcmcvb25nb2luZy9XaGVuLzIwMHgvMjAwNC8wMS8xMS9Qb3N0ZWxQaWxncmltIj4KICA8cGF0aCBkPSJNMTAsMTVjMTAsMTAsMTAsMCw0MCwwYzMwLDAsMzAsMTAsNDAsMHEtMTAsMzAtNDAsMzBxLTMwLDAtNDAtMzAiCiAgICBzdHJva2U9ImJsYWNrIiBmaWxsPSJyZWQiLz4KICA8ZWxsaXBzZSBzdHJva2U9ImJsYWNrIiBmaWxsPSJ3aGl0ZSIgY3g9IjUwIiBjeT0iNDAiIHJ4PSIyMiIgcnk9IjM1Ii8+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI0MCIgcj0iNSIgc3Ryb2tlPSJibGFjayIgZmlsbD0icmVkIi8+CiAgPGNpcmNsZSBjeD0iNDgiIGN5PSIzOCIgcj0iMSIgZmlsbD0id2hpdGUiLz4KICA8cGF0aCBkPSJNMzUsNDVDNDAsNzUsNjAsNzUsNjUsNDVRNTAsNjAsMzUsNDVaIgogICAgc3Ryb2tlPSJyZWQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjIiLz4KICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjMwIiByPSIyIi8+CiAgPHBhdGggZD0iTTM1LDMwcTUtMTAsMTAsMHEtNS0zMC0xMCwwIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTTU1LDMwcTUtMTAsMTAsMHEtNS0zMC0xMCwwIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIi8+CiAgPC9hPgo8L3N2Zz4K';
    this.imagesMap.set('bozo', { image, isLoaded: false });
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // This should fail because images are not loaded at this point
    this.drawImages();
  }

  drawImage(image: any) {
    this.ctx.drawImage(
      image,
      this.getRandomNumber(0, 250),
      this.getRandomNumber(0, 250),
      image.width,
      image.height
    );
  }

  drawImages() {
    if (this.areAllImagesLoaded) {
      this.imagesMap.forEach((f) => this.drawImage(f.image));
    } else {
      console.log('All images are not loaded!');
    }
  }

  getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
