import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TulovComponent } from './tulov.component';

describe('TulovComponent', () => {
  let component: TulovComponent;
  let fixture: ComponentFixture<TulovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TulovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TulovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
