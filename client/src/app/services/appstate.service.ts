import { Injectable } from '@angular/core';
import { AppVersionComponent } from '../components/app-version/app-version.component';
import { EnvironmentComponent } from '../components/environment/environment.component';
import { ApiComponent } from '../components/api/api.component';
import { IndexedDBComponent } from '../components/indexed-db/indexed-db.component';

@Injectable({
  providedIn: 'root'
})
export class AppstateService {

  private componentList = {
    'App Version':{ component: AppVersionComponent, available: true },
    'Environment': { component: EnvironmentComponent, available: true },
    'API': {component: ApiComponent, available: true },
    'IndexedDB': {component: IndexedDBComponent, available: true }
  };
  
  constructor() { }
  public getComponentList(){
    return this.componentList;
  }
}
