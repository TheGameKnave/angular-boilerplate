// client/src/app/indexed-db/indexed-db.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IndexedDBComponent } from './indexed-db.component';
import { getTranslocoModule } from '../../helpers/transloco-testing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { openDB, IDBPDatabase } from 'idb';

describe('IndexedDBComponent initialization', () => {
  let component: IndexedDBComponent;
  let fixture: ComponentFixture<IndexedDBComponent>;
  let db: IDBPDatabase;

  beforeEach(async () => {
    db = await openDB('boilerplate', 1, {
      upgrade(db) {
        db.createObjectStore('keyval');
      },
    });
  
    await TestBed.configureTestingModule({
      imports: [
        IndexedDBComponent,
        getTranslocoModule(),
        ReactiveFormsModule,
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(IndexedDBComponent);
    component = fixture.componentInstance;
    component.dbPromise = db.put('keyval', 'Initial data', 'key').then(() => db);

    fixture.detectChanges();
  });

  afterEach(async () => {
    await db.clear('keyval');
    db.close();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a IndexedDB instance', async () => {
    expect(component.dbPromise).toBeDefined();
  });

  it('should load data from IndexedDB on initialization', async () => {
    await component.getDbValue();
    expect(component.textAreaData.value).toBe('Initial data');
  });
});

describe('IndexedDBComponent operations', () => {
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
    }).compileComponents();

    fixture = TestBed.createComponent(IndexedDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Create a mock IndexedDB instance
    db = await openDB('boilerplate', 1, {
      upgrade(db) {
        db.createObjectStore('keyval');
      },
    });
    await fixture.whenStable();
  });

  afterEach(async () => {
    await db.clear('keyval');
    db.close();
  });

  it('should store text area value in IndexedDB', fakeAsync(async () => {
    const testData = 'Test data';
    let storedValue: any;
    component.textAreaData.setValue(testData);
  
    // Simulate the passage of time for the debounce
    tick(500);
  
    // Verify the value is stored in IndexedDB
    await db.get('keyval', 'key').then((res) => {
      storedValue = res;
    });
    expect(storedValue).toBe(testData);
  }));
});