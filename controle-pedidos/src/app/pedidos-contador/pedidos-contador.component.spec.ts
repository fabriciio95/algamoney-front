import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosContadorComponent } from './pedidos-contador.component';

describe('PedidosContadorComponent', () => {
  let component: PedidosContadorComponent;
  let fixture: ComponentFixture<PedidosContadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosContadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
