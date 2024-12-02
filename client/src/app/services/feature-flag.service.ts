import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { componentList } from '../app.component';
import equal from 'fast-deep-equal';

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
  features = signal<Record<string, boolean>>({});

  getFeatureFlags(): Observable<FeatureFlagResponse> {
    return this.http.get<FeatureFlagResponse>('/api/flags').pipe(tap((features) => this.features.set(features)));
  }

  setFeature(feature: FeatureFlagKeys, value: boolean) {
    const newFeatures = { ...this.features(), [feature]: value };
    this.features.set(newFeatures);
    this.http.put('/api/flags', newFeatures).subscribe((res: ArbitraryFeatures) => {
      if (!equal(this.features(), res)) this.features.set(res);
    });
  }

  getFeature(feature: FeatureFlagKeys): boolean {
    return this.features()[feature] ?? feature === 'Features' ?? false;
  }
}
