import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCajaComponent } from './info-caja.component';

describe('InfoCajaComponent', () => {
  let component: InfoCajaComponent;
  let fixture: ComponentFixture<InfoCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
