import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styleUrls: ['./carousel-image.component.scss'],
})
export class CarouselImageComponent {
  @Input()
  img: string;

  // constructor() {

  //   console.log()
  //  }

  // ngOnInit(): void {
  // }
}
