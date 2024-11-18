import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';

import { UpdateService } from './services/update.service';
import { AutoUnsubscribe } from "src/app/helpers/unsub";

import { TranslocoDirective } from '@jsverse/transloco';

import { AppVersionComponent } from './components/app-version/app-version.component';
import { EnvironmentComponent } from './components/environment/environment.component';
import { IndexedDBComponent } from './components/indexed-db/indexed-db.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ApiComponent } from './components/api/api.component';

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
  public componentList = {
    'App Version':{ component: AppVersionComponent, available: true },
    'Environment': { component: EnvironmentComponent, available: true },
    'API': {component: ApiComponent, available: true },
    'IndexedDB': {component: IndexedDBComponent, available: true }
  };
  public activeComponent: number | null = null;

  constructor(
    private updateService: UpdateService,
    private cookieService: CookieService, 
  ){
    this.updateService.checkForUpdates();
  }

  ngOnInit(): void {
    let activeButton = this.cookieService.get('activeButton');
    if(['', 'null'].includes(activeButton)) {
      this.activeComponent = null;
    }else {
      this.activeComponent = Number(activeButton);
    }
  }
  onComponentActivate(component: number | null): void {
    this.activeComponent = component;
    this.cookieService.set("activeButton", component !== null ? component.toString() : "null");
  }

  ngOnDestroy(): void {}
}
