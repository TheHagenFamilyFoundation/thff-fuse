import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-states',
  templateUrl: './about-states.component.html',
  styleUrls: ['./about-states.component.scss'],
})
export class AboutStatesComponent implements OnInit {
  coloradoImage = './assets/images/colorado.png';

  michiganImage = './assets/images/michigan.png';

  floridaImage = './assets/images/florida.png';

  constructor() { }

  ngOnInit() {
  }
}
