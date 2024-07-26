import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExampleTwoComponent } from './example-two.component';

describe('ExampleTwoComponent', () => {
  let component: ExampleTwoComponent;
  let fixture: ComponentFixture<ExampleTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ExampleTwoComponent],
    });
    fixture = TestBed.createComponent(ExampleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});