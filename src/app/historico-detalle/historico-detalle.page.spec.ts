import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoricoDetallePage } from './historico-detalle.page';

describe('HistoricoDetallePage', () => {
  let component: HistoricoDetallePage;
  let fixture: ComponentFixture<HistoricoDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
