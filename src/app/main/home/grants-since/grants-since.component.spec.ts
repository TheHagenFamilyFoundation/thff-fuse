import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantsSinceComponent } from './grants-since.component';

describe('GrantsSinceComponent', () => {
  let component: GrantsSinceComponent;
  let fixture: ComponentFixture<GrantsSinceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantsSinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantsSinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
