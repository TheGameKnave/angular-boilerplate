import { Component, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'src/app/helpers/unsub';

@Component({
  selector: 'app-example-one',
  templateUrl: './example-one.component.html',
})
@AutoUnsubscribe()
export class ExampleOneComponent implements OnDestroy {
  
  ngOnDestroy(): void {
  }
}
