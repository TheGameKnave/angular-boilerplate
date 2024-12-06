import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';

import { UpdateService } from './services/update.service';
import { AutoUnsubscribe } from "src/app/helpers/unsub";

import { TranslocoDirective } from '@jsverse/transloco';

import { FooterComponent } from './components/layout/footer/footer.component';
import { AppVersionComponent } from './components/app-version/app-version.component';
import { EnvironmentComponent } from './components/environment/environment.component';
import { ApiComponent } from './components/api/api.component';
import { IndexedDBComponent } from './components/indexed-db/indexed-db.component';
import { FeatureFlagService } from './services/feature-flag.service';
import { FeaturesComponent } from './components/features/features.component';
  
type ComponentList = {
  [key: string]: any
}
export const componentList: ComponentList = {
  'Features': FeaturesComponent,
  'App Version': AppVersionComponent,
  'Environment': EnvironmentComponent,
  'API': ApiComponent,
  'IndexedDB': IndexedDBComponent,
};

@AutoUnsubscribe()
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
export class AppComponent implements OnDestroy {
  componentList = componentList;
  componentListArr = Object.entries(componentList);
  activeComponent: string | null = null;

  constructor(
    private updateService: UpdateService,
    private cookieService: CookieService, 
    protected featureFlagService: FeatureFlagService,
  ){
    this.updateService.checkForUpdates();
  }

  ngOnInit(): void {
    let activeButton = this.cookieService.get('activeButton');
    activeButton = this.featureFlagService.getFeature(activeButton) ? activeButton : '';
    if(['', 'null'].includes(activeButton)) {
      this.activeComponent = null;
    }else {
      this.activeComponent = activeButton;
    }
  }
  onComponentActivate(component: string | null): void {
    this.activeComponent = component;
    this.cookieService.set("activeButton", component !== null ? component.toString() : "null");
  }

  ngOnDestroy(): void {}
}
