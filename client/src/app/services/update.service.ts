import { Injectable } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { AutoUnsubscribe } from 'src/app/helpers/unsub';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@AutoUnsubscribe()
export class UpdateService {
  constructor(
    private updates: SwUpdate
  ){
    if (updates.isEnabled) {
      this.checkForUpdates();
    }
  }

  public checkForUpdates(): void {
    console.log('checking for updates');
    this.updates.versionUpdates.subscribe(event => {
      console.log(event);
      this.promptUser(event);
    });

    interval(20 * 60 * 1).subscribe(() => {
      console.log('checking for updates')
      this.updates.checkForUpdate().then(() => {
        console.log('checked for updates');
      });
    });

  }

  /* istanbul ignore next */
  private promptUser(event: VersionEvent): void {
    console.log(event);
    console.log('new version available');
    if(event.type == 'VERSION_READY') {
      if(confirm('A new version is available. Please click “OK” to reload.')) {
        window.location.reload();
      }
    }else if(event.type == 'VERSION_DETECTED') {
      console.log(event);
    }
  }
}
