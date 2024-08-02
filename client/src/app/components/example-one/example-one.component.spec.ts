import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleOneComponent } from './example-one.component';
import { getTranslocoModule } from 'src/app/helpers/transloco-testing.module';

describe('ExampleOneComponent', () => {
  let component: ExampleOneComponent;
  let fixture: ComponentFixture<ExampleOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExampleOneComponent,
        getTranslocoModule(),
      ],
    });
    fixture = TestBed.createComponent(ExampleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
