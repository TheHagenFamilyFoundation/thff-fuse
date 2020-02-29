import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullProposalItemsTwoComponent } from './full-proposal-items-two.component';

describe('FullProposalItemsTwoComponent', () => {
  let component: FullProposalItemsTwoComponent;
  let fixture: ComponentFixture<FullProposalItemsTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullProposalItemsTwoComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullProposalItemsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
