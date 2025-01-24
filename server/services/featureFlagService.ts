import fs from 'fs';
import path from 'path';

// Path to the mock database file
const FEATURE_FLAGS_PATH = path.resolve(__dirname, '../data/featureFlags.json');

// Read feature flags from the JSON file
export const readFeatureFlags = async () => {
  const maxRetries = 3;
  const retryDelay = 100; // 100ms

  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const data = await fs.promises.readFile(FEATURE_FLAGS_PATH, 'utf-8');
      if (!data?.trim()) {
        console.log('Feature flags file is empty or busy; retrying...');
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }

      return JSON.parse(data); // Return parsed JSON if successful
    } catch (err) {
      lastError = err; // Store the error
      if (err instanceof SyntaxError) {
        console.error('Error parsing JSON:', err);
        throw err; // Do not retry for JSON parsing errors
      }

      console.error('Error reading feature flags file:', err);
      if (i < maxRetries - 1) {
        console.log('Retrying...');
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  if (!lastError) {
    console.warn('Feature flags file was empty after retries. Returning undefined.');
    return undefined; // Explicitly return undefined for empty files
  }

  throw lastError; // Throw the last error if retries failed for other reasons
};




// Write updated feature flags to the JSON file
export const writeFeatureFlags = async (newFeatures: Record<string, boolean>) => {
  const existingFeatures = await readFeatureFlags();
  const updatedFeatures = { ...existingFeatures, ...newFeatures };
  await fs.promises.writeFile(FEATURE_FLAGS_PATH, JSON.stringify(updatedFeatures, null, 2), 'utf-8');
  return updatedFeatures;
};
