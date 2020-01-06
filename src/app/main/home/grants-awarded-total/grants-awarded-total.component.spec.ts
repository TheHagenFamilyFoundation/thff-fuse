import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantsAwardedTotalComponent } from './grants-awarded-total.component';

describe('GrantsAwardedTotalComponent', () => {
  let component: GrantsAwardedTotalComponent;
  let fixture: ComponentFixture<GrantsAwardedTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantsAwardedTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantsAwardedTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
