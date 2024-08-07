import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleTwoComponent } from './example-two.component';
import { getTranslocoModule } from 'src/app/helpers/transloco-testing.module';

describe('ExampleTwoComponent', () => {
  let component: ExampleTwoComponent;
  let fixture: ComponentFixture<ExampleTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExampleTwoComponent,
        getTranslocoModule(),
      ],
    });
    fixture = TestBed.createComponent(ExampleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});