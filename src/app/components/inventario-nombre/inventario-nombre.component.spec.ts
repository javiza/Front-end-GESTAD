import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventarioNombreComponent } from './inventario-nombre.component';

describe('InventarioNombreComponent', () => {
  let component: InventarioNombreComponent;
  let fixture: ComponentFixture<InventarioNombreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InventarioNombreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InventarioNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
