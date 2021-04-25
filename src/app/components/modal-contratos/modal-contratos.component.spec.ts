import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContratosComponent } from './modal-contratos.component';

describe('ModalContratosComponent', () => {
  let component: ModalContratosComponent;
  let fixture: ComponentFixture<ModalContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContratosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
