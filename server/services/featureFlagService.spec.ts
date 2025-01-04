import { readFeatureFlags, writeFeatureFlags } from './featureFlagService';
import fs from 'fs';
import path from 'path';

// Path to the mock database file
const FEATURE_FLAGS_PATH = path.resolve(__dirname, '../data/featureFlags.json');

// Mock the fs module
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  writeFileSync: jest.fn(), // Mock the writeFileSync method
}));

describe('FeatureFlagsService', () => {
  beforeEach(() => {
    // Reset the mock before each test to ensure clean state
    (fs.writeFileSync as jest.Mock).mockClear();
  });

  describe('writeFeatureFlags', () => {
    it('should write updated feature flags to the JSON file once', () => {
      // Prepare the new features to write
      const newFeatures = { 'App Version': false, 'Environment': true };

      // Mock fs.writeFileSync (no-op)
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      // Call the function once
      writeFeatureFlags(newFeatures);

      // Assertions
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1); // Check only one call
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        FEATURE_FLAGS_PATH,
        JSON.stringify(newFeatures, null, 2),
        'utf-8'
      );
    });

    it('should not modify actual files during testing', () => {
      // Prepare the new features
      const newFeatures = { 'App Version': false, 'Environment': true };

      // Mock fs.writeFileSync (no-op)
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      // Call the function
      writeFeatureFlags(newFeatures);

      // Check that fs.writeFileSync was called with the correct parameters
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        FEATURE_FLAGS_PATH,
        JSON.stringify(newFeatures, null, 2),
        'utf-8'
      );
    });
  });
});
