import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { openDB } from 'idb';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-indexed-db',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslocoDirective,
  ],
  templateUrl: './indexed-db.component.html',
  styles: ``
})
export class IndexedDBComponent {
  textAreaData = new FormControl('');
  textAreaSub: Subscription | undefined;

  ngOnInit() {
    this.get('key').then(data => {
      if (data) {
        this.textAreaData.setValue(data);
      }
    })
    this.textAreaSub = this.textAreaData.valueChanges.pipe(
      debounceTime(400)
    ).subscribe((data) => {
      console.log(data);
      this.set('key', data);
    });
    this.dbPromise.then(async db => {
      console.log(db);
    });
  }
  dbPromise = openDB('boilerplate', 1, {
    upgrade(db) {
      db.createObjectStore('keyval');
    },
  });
  
  async get(key:any) {
    return (await this.dbPromise).get('keyval', key);
  }
  async set(key:any, val:any) {
    return (await this.dbPromise).put('keyval', val, key);
  }
  async del(key:any) {
    return (await this.dbPromise).delete('keyval', key);
  }
  async clear() {
    return (await this.dbPromise).clear('keyval');
  }
  async keys() {
    return (await this.dbPromise).getAllKeys('keyval');
  }

}
