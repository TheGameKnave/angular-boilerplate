// client/src/app/indexed-db/indexed-db.component.spec.ts
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { IndexedDBComponent } from './indexed-db.component';
import { getTranslocoModule } from '../helpers/transloco-testing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { openDB, IDBPDatabase } from 'idb';

describe('IndexedDBComponent', () => {
  let component: IndexedDBComponent;
  let fixture: ComponentFixture<IndexedDBComponent>;
  let db: IDBPDatabase;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IndexedDBComponent,
        getTranslocoModule(),
        ReactiveFormsModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IndexedDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Create a mock IndexedDB instance
    db = await openDB('test-db', 1, {
      upgrade(db) {
        db.createObjectStore('keyval');
      },
    });
  });

  afterEach(async () => {
    // Close the mock IndexedDB instance
    await db.close();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a IndexedDB instance', async () => {
    expect(component.dbPromise).toBeDefined();
  });

  it('should store text area value in IndexedDB', async () => {
    const testData = 'Test data';
    component.textAreaData.setValue(testData);
    fixture.detectChanges();

    // Wait for the value to be stored in IndexedDB
    await fixture.whenStable();

    // Simulate the passage of time
    fixture.whenStable().then(() => {
      // To wait for the 400ms debounce
      tick(500);
      fixture.detectChanges();

      // Verify the value is stored in IndexedDB
      db.get('keyval', 'key').then(storedValue => {
        expect(storedValue).toBe(testData);
      });
    });
  });

  it('should retrieve text area value from IndexedDB on initialization', async () => {
    // Store a value in IndexedDB
    db.put('keyval', 'Initial data', 'key').then(() => {
      // Call ngOnInit
      component.ngOnInit();
  
      // Simulate the passage of time
      fixture.whenStable().then(() => {
        // To wait for the 400ms debounce
        tick(500);
        fixture.detectChanges();
  
        // Expect the text area value to be updated
        expect(component.textAreaData.value).toBe('Initial data');
      });
    });
  });  
});