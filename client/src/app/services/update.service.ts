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
    public updates: SwUpdate
  ){
    if (updates.isEnabled) {
      console.log('enabled');
      interval(20 * 60 * 1000).subscribe(() => updates.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
  }

  public checkForUpdates(): void {
    console.log('checking for updates');
    this.updates.versionUpdates.subscribe(event => this.promptUser(event));
  }

  private promptUser(event: VersionEvent): void {
    if(event.type == 'VERSION_READY') {
      if(confirm('A new version is available. Please click “OK” to reload.')) {
        window.location.reload();
      }
    }else if(event.type == 'VERSION_DETECTED') {
      console.log(event);
    }
  }
}
