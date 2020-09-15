import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevoArticuloPage } from './nuevo-articulo.page';

describe('NuevoArticuloPage', () => {
  let component: NuevoArticuloPage;
  let fixture: ComponentFixture<NuevoArticuloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoArticuloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
