import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioadminPage } from './inventarioadmin.page';

describe('InventarioadminPage', () => {
  let component: InventarioadminPage;
  let fixture: ComponentFixture<InventarioadminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
