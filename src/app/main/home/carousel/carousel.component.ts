import { Component } from '@angular/core';
import {
  trigger, transition, useAnimation,
} from '@angular/animations';

import {
  fadeIn,
  fadeOut,
} from './carousel.animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [useAnimation(fadeIn, { params: { time: '1300ms' } })]),
      transition('* => void', [useAnimation(fadeOut, { params: { time: '1300ms' } })]),
    ]),
  ],
})

export class CarouselComponent {
  fullImagePath2 = '../assets/images/cv_busses1.JPG';

  fullImagePath3 = '../assets/images/grant_review_timeline.png';

  fullImagePath4 = '../assets/images/southern_shakespeare.png';

  fullImagePath5 = '../assets/images/family.png';

  public slides = [
    { src: this.fullImagePath2, caption: 'The Christus Victor pre-school children are happy with their new buses. View Grants Awarded Click Here' },
    { src: this.fullImagePath3, caption: 'Learn about our grant giving process and the requirements for submitting a grant request. Read More' },
    { src: this.fullImagePath4, caption: 'Apply Now' },
    { src: this.fullImagePath5, caption: 'The THFF Board of Directors contains two generations of family members. Learn more about us' },
  ];

  currentSlide = 0;

  constructor() {
    console.log('carousel component');
    this.startSlideShow();
  }

  startSlideShow() {
    setInterval(() => { this.onNextClick(); }, 5000);
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    // console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    // console.log('next clicked, new current slide is: ', this.currentSlide);
  }
}
