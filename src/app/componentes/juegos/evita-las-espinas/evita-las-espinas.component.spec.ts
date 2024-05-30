import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvitaLasEspinasComponent } from './evita-las-espinas.component';

describe('EvitaLasEspinasComponent', () => {
  let component: EvitaLasEspinasComponent;
  let fixture: ComponentFixture<EvitaLasEspinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvitaLasEspinasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvitaLasEspinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
