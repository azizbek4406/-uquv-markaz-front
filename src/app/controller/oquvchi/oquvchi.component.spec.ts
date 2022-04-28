import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OquvchiComponent } from './oquvchi.component';

describe('OquvchiComponent', () => {
  let component: OquvchiComponent;
  let fixture: ComponentFixture<OquvchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OquvchiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OquvchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
