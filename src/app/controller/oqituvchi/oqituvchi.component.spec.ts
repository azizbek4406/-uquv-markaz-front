import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OqituvchiComponent } from './oqituvchi.component';

describe('OqituvchiComponent', () => {
  let component: OqituvchiComponent;
  let fixture: ComponentFixture<OqituvchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OqituvchiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OqituvchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
