import { Component, OnDestroy } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { AutoUnsubscribe } from 'src/app/helpers/unsub';

@Component({
    selector: 'app-example-one',
    templateUrl: './example-one.component.html',
    standalone: true,
    imports: [TranslocoDirective],
    styles: ``
})
@AutoUnsubscribe()
export class ExampleOneComponent implements OnDestroy {
  
  ngOnDestroy(): void {
  }
}
