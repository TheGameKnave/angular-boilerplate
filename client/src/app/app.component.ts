import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public version: string = packageJson.version;

  constructor(
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {

  }

}

