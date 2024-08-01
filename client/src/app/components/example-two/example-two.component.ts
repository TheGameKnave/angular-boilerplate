import { Component, OnDestroy } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { AutoUnsubscribe } from 'src/app/helpers/unsub';

@Component({
    selector: 'app-example-two',
    templateUrl: './example-two.component.html',
    standalone: true,
    imports: [TranslocoDirective],
    styles: ``
})
@AutoUnsubscribe()
export class ExampleTwoComponent implements OnDestroy {

  ngOnDestroy(): void {
  }
}