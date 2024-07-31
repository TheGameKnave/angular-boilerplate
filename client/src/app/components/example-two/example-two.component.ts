import { Component, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'src/app/helpers/unsub';

@Component({
  selector: 'app-example-two',
  templateUrl: './example-two.component.html',
  styles: ``
})
@AutoUnsubscribe()
export class ExampleTwoComponent implements OnDestroy {

  ngOnDestroy(): void {
  }
}