import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-caption',
  templateUrl: './carousel-caption.component.html',
  styleUrls: ['./carousel-caption.component.scss'],
})
export class CarouselCaptionComponent implements OnInit {
  @Input()
  caption: string;

  constructor() { }

  ngOnInit(): void {
  }
}
