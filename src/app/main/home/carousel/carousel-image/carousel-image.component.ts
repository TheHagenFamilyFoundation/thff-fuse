import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styleUrls: ['./carousel-image.component.scss'],
})
export class CarouselImageComponent implements OnInit {
  @Input()
  img: string;

  constructor() { }

  ngOnInit(): void {
  }
}
