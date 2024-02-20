import { Component, OnDestroy, OnInit } from '@angular/core';
import { AutoUnsubscribe } from "src/app/helpers/unsub";
import { CookieService } from 'ngx-cookie-service';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
@AutoUnsubscribe()
export class AppComponent implements OnInit, OnDestroy {
  public version: string = packageJson.version;

  constructor(
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {}
}

