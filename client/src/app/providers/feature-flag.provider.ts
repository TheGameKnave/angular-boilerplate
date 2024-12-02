import { APP_INITIALIZER, inject } from "@angular/core";
import { Observable } from "rxjs";
import { FeatureFlagService } from "../services/feature-flag.service";

function initializeFeatureFlag(): () => Observable<any> {
  const featureFlagService = inject(FeatureFlagService);
  return () => featureFlagService.getFeatureFlags();
}

export const provideFeatureFlag = () => ({
  provide: APP_INITIALIZER,
  useFactory: initializeFeatureFlag,
  deps: [],
  multi: true,
})