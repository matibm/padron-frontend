import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoPdfComponent } from './contrato-pdf.component';

describe('ContratoPdfComponent', () => {
  let component: ContratoPdfComponent;
  let fixture: ComponentFixture<ContratoPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
