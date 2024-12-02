import { Component } from '@angular/core';
import { TranslocoDirective} from '@jsverse/transloco';
import { FeatureFlagService } from 'src/app/services/feature-flag.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    TranslocoDirective
  ],
  templateUrl: './features.component.html',
  styles: ``
})
export class FeaturesComponent {
  Object = Object;
  constructor(
    featureFlagService: FeatureFlagService,
  ){}
}
