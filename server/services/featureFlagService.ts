import fs from 'fs';
import path from 'path';

// Path to the mock database file
const FEATURE_FLAGS_PATH = path.resolve(__dirname, '../data/featureFlags.json');

// Read feature flags from the JSON file
export const readFeatureFlags = (): Record<string, boolean> => {
  const data = fs.readFileSync(FEATURE_FLAGS_PATH, 'utf-8');
  return JSON.parse(data);
};

// Write updated feature flags to the JSON file
export const writeFeatureFlags = (newFeatures: Record<string, boolean>) => {
  fs.writeFileSync(FEATURE_FLAGS_PATH, JSON.stringify(newFeatures, null, 2), 'utf-8');
};
