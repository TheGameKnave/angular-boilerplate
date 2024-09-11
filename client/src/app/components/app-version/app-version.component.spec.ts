import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVersionComponent } from './app-version.component';
import { getTranslocoModule } from 'src/app/helpers/transloco-testing.module';

describe('AppVersionComponent', () => {
  let component: AppVersionComponent;
  let fixture: ComponentFixture<AppVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppVersionComponent,
        getTranslocoModule(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppVersionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});