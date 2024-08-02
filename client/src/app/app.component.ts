import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { UpdateService } from './services/update.service';
import { AutoUnsubscribe } from "src/app/helpers/unsub";

import packageJson from '../../../package.json';

import { ExampleOneComponent } from './components/example-one/example-one.component';
import { ExampleTwoComponent } from './components/example-two/example-two.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ExampleOneComponent,
        ExampleTwoComponent,
        FooterComponent,
        TranslocoDirective,
    ],
    styles: ``
})
@AutoUnsubscribe()
export class AppComponent implements OnDestroy {
  public version: string = packageJson.version;
  public componentToShow: string = 'example-one';

  constructor(
    private updateService: UpdateService,
  ){
    this.updateService.checkForUpdates();
  }
  
  onComponentToggle(component: string): void {
    this.componentToShow = component;
  }

  ngOnDestroy(): void {}
}

