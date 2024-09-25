import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedDBComponent } from './indexed-db.component';
import { getTranslocoModule } from '../helpers/transloco-testing.module';

describe('IndexedDBComponent', () => {
  let component: IndexedDBComponent;
  let fixture: ComponentFixture<IndexedDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IndexedDBComponent,
        getTranslocoModule(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexedDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
