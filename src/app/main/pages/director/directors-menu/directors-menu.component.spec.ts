import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorMenuComponent } from './director-menu.component';

describe('DirectorMenuComponent', () => {
  let component: DirectorMenuComponent;
  let fixture: ComponentFixture<DirectorMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
