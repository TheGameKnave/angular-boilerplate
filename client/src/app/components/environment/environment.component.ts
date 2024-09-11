import { Component, isDevMode } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-environment',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './environment.component.html',
  styles: ``
})
export class EnvironmentComponent {
  isDevMode = isDevMode();
}
