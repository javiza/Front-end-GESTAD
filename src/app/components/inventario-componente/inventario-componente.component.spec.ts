import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventarioComponenteComponent } from './inventario-componente.component';

describe('InventarioComponenteComponent', () => {
  let component: InventarioComponenteComponent;
  let fixture: ComponentFixture<InventarioComponenteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InventarioComponenteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InventarioComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
