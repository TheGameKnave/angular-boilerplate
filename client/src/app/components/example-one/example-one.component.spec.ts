import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExampleOneComponent } from './example-one.component';

describe('ExampleOneComponent', () => {
  let component: ExampleOneComponent;
  let fixture: ComponentFixture<ExampleOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ExampleOneComponent],
    });
    fixture = TestBed.createComponent(ExampleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
