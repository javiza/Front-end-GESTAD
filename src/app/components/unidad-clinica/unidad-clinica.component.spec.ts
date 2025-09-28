import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnidadClinicaComponent } from './unidad-clinica.component';

describe('UnidadClinicaComponent', () => {
  let component: UnidadClinicaComponent;
  let fixture: ComponentFixture<UnidadClinicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UnidadClinicaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnidadClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
