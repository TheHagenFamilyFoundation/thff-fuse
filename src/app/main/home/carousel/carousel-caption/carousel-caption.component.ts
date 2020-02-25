import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-caption',
  templateUrl: './carousel-caption.component.html',
  styleUrls: ['./carousel-caption.component.scss'],
})
export class CarouselCaptionComponent implements OnInit {
  @Input()
  caption: any;

  // caption
  // text: string;

  // textLink: string;

  // link: string;

  // @Input()
  // link: string;

  constructor() { }

  ngOnInit(): void {

    // this.text = this.caption.text;
    // this.textLink = this.caption.

  }
}
