import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutStatesComponent } from './about-states.component';

describe('AboutStatesComponent', () => {
  let component: AboutStatesComponent;
  let fixture: ComponentFixture<AboutStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
