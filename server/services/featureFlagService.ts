// Import lowdb 1.0.0; TODO rip this out as soon as you have a data solution
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Path to the mock database file
const adapter = new FileSync('data/db.json');
const db = low(adapter);

// Read feature flags from the JSON file
export const readFeatureFlags = () => {
  return db.get('featureFlags').value();
};


// Write updated feature flags to the JSON file
export const writeFeatureFlags = (newFeatures: Record<string, boolean>) => {
  const existingFeatures = readFeatureFlags();
  console.log(existingFeatures)
  const updatedFeatures = { ...existingFeatures, ...newFeatures };
  db.set('featureFlags',updatedFeatures).write();
  return updatedFeatures;
};
