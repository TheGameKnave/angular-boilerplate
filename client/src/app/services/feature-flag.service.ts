import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable, tap } from 'rxjs';
import { componentList } from '../app.component';

type ArbitraryFeatures = {
  // 'New Feature': boolean;
  // Add more arbitrary features here
};
type ComponentFlags = typeof componentList;

type FeatureFlagResponse = ArbitraryFeatures & ComponentFlags;

type _FeatureFlagKeys = keyof FeatureFlagResponse;
export type FeatureFlagKeys = {
  [K in _FeatureFlagKeys]: K;
}[_FeatureFlagKeys];

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  http = inject(HttpClient);
  socket = inject(Socket);

  features = signal<Record<string, boolean>>({});

  getFeatureFlags(): Observable<FeatureFlagResponse> {
    return this.http.get<FeatureFlagResponse>('/api/flags').pipe(tap((features) => this.features.set(features)));
  }
  constructor() {
    // Listen for WebSocket updates
    this.socket.on('feature-flag-update', (update: Partial<FeatureFlagResponse>) => {
      const newFeatures = { ...this.features(), ...update };
      this.features.set(newFeatures);
    });
  }


  /**
   * Update a feature flag both locally and on the backend.
   * Sends updates via WebSocket.
   */
  setFeature(feature: FeatureFlagKeys, value: boolean) {
    const newFeatures = { ...this.features(), [feature]: value };
    this.features.set(newFeatures);

    // Notify backend of the updated flag
    this.socket.emit('update-feature-flag', { [feature]: value });
  }

  /**
   * Get the value of a specific feature flag.
   */
  getFeature(feature: FeatureFlagKeys): boolean {
    return this.features()[feature] ?? feature === 'Features';
  }
}
