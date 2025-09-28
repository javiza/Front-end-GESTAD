import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GraficoPrendaComponent } from './grafico-prenda.component';

describe('GraficoPrendaComponent', () => {
  let component: GraficoPrendaComponent;
  let fixture: ComponentFixture<GraficoPrendaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GraficoPrendaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoPrendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
