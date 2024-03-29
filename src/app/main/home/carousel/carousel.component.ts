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
  fullImagePath1 = '../assets/images/grant_cycle_round2_2020_teal.png';

  fullImagePath2 = '../assets/images/cv_busses1.JPG';

  // fullImagePath3 = '../assets/images/grant_review_timeline.png'; // april 15th

  fullImagePath3 = '../assets/images/Grant_Review_Timeline_new.jpg'; // new for 2022

  fullImagePath4 = '../assets/images/southern_shakespeare.png';

  fullImagePath5 = '../assets/images/family.png';


  public slides = [
    { src: this.fullImagePath1, caption: { text: '', textLink: '', link: '' } },
    { src: this.fullImagePath2, caption: { text: 'The Christus Victor pre-school children are happy with their new buses.', textLink: 'Click Here To See Previously Awarded Grants.', link: '/grants-awarded' } },
    { src: this.fullImagePath3, caption: { text: 'Learn about our grant giving process and the requirements for submitting a grant request.', textLink: 'Click Here To Read More.', link: '/application' } },
    { src: this.fullImagePath4, caption: { text: 'The Southern Shakespeare Company\'s Bardlings performing with new sound equipment!', textLink: 'Click Here To Apply Now.', link: '/application' } },
    { src: this.fullImagePath5, caption: { text: 'The THFF Board of Directors contains two generations of family members.', textLink: 'Click Here To Learn More About Us.', link: '/about' } },
  ];

  currentSlide = 0;

  constructor() {
    this.startSlideShow();
  }

  startSlideShow(): void {
    setInterval(() => { this.onNextClick(); }, 10000);
  }

  onPreviousClick(): void {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    // console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick(): void {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    // console.log('next clicked, new current slide is: ', this.currentSlide);
  }
}
