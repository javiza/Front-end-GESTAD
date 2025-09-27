import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovimientosComponenteComponent } from './movimientos-componente.component';

describe('MovimientosComponenteComponent', () => {
  let component: MovimientosComponenteComponent;
  let fixture: ComponentFixture<MovimientosComponenteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MovimientosComponenteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientosComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
