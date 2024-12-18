import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketIoService } from './socket.io.service';

export interface FeatureFlag {
  key: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SocketFeatureService {
  constructor(private socketIoService: SocketIoService) {}

  // Subscribe to feature flag updates
  getFeatureFlags(): Observable<FeatureFlag[]> {
    return this.socketIoService.listen<FeatureFlag[]>('feature-flags');
  }

  // Emit an event to request feature flag updates
  requestFeatureFlags(): void {
    this.socketIoService.emit('request-feature-flags');
  }
}
