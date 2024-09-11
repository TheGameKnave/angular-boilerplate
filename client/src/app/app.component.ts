import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { UpdateService } from './services/update.service';
import { AutoUnsubscribe } from "src/app/helpers/unsub";

import { TranslocoDirective } from '@jsverse/transloco';

import { ExampleOneComponent } from './components/example-one/example-one.component';
import { ExampleTwoComponent } from './components/example-two/example-two.component';
import { AppVersionComponent } from './components/app-version/app-version.component';
import { FooterComponent } from './components/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgComponentOutlet,
    TranslocoDirective,
    FooterComponent,
  ],
  styles: ``
})
@AutoUnsubscribe()
export class AppComponent implements OnDestroy {
  public componentList: any[] = [
    { name: 'Example One', component: ExampleOneComponent },
    { name: 'Example Two', component: ExampleTwoComponent },
    { name: 'App Version', component: AppVersionComponent },
  ];
  public activeComponent: number | null = null;

  constructor(
    private updateService: UpdateService,
  ){
    this.updateService.checkForUpdates();
  }

  onComponentActivate(component: number | null): void {
    this.activeComponent = component;
  }

  ngOnDestroy(): void {}
}
