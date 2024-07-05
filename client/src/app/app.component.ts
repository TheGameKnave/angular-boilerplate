import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AutoUnsubscribe } from "src/app/helpers/unsub";
import { CookieService } from 'ngx-cookie-service';
import packageJson from '../../../package.json';
import { UpdateService } from './services/update.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@AutoUnsubscribe()
export class AppComponent implements OnInit, OnDestroy {
  public version: string = packageJson.version;
  public componentToShow: string = 'example-one';

  constructor(
    private cookieService: CookieService,
    private updateService: UpdateService,
    private translate: TranslateService, // used in the template
  ){
    updateService.checkForUpdates();
  }

  ngOnInit(): void {
  }
  onComponentToggle(component: string): void {
    this.componentToShow = component;
  }

  ngOnDestroy(): void {}
}

