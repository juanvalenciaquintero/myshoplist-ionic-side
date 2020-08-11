import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoricoArticulosPage } from './historico-articulos.page';

describe('HistoricoArticulosPage', () => {
  let component: HistoricoArticulosPage;
  let fixture: ComponentFixture<HistoricoArticulosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoArticulosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoArticulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
