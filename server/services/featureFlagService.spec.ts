import fs from 'fs';
import { readFeatureFlags, writeFeatureFlags } from './featureFlagService';

// Mock fs.promises
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

describe('FeatureFlagsService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('readFeatureFlags', () => {
    it('should return parsed JSON data if the file contains valid data', async () => {
      const mockData = JSON.stringify({ featureA: true, featureB: false });
      (fs.promises.readFile as jest.Mock).mockResolvedValueOnce(mockData);

      const result = await readFeatureFlags();

      expect(result).toEqual({ featureA: true, featureB: false });
      expect(fs.promises.readFile).toHaveBeenCalledWith(expect.any(String), 'utf-8');
    });

    it('should retry and return undefined if the file is empty', async () => {
      (fs.promises.readFile as jest.Mock)
        .mockResolvedValueOnce('')
        .mockResolvedValueOnce('')
        .mockResolvedValueOnce('');

      const result = await readFeatureFlags();

      expect(result).toBeUndefined();
      expect(fs.promises.readFile).toHaveBeenCalledTimes(3);
    });

    it('should throw an error for invalid JSON', async () => {
      (fs.promises.readFile as jest.Mock).mockResolvedValueOnce('{invalidJSON');

      await expect(readFeatureFlags()).rejects.toThrow(SyntaxError);
      expect(fs.promises.readFile).toHaveBeenCalledTimes(1);
    });

    it('should retry on read errors and eventually throw', async () => {
      const mockError = new Error('File not found');
      (fs.promises.readFile as jest.Mock)
        .mockRejectedValueOnce(mockError)
        .mockRejectedValueOnce(mockError)
        .mockRejectedValueOnce(mockError);

      await expect(readFeatureFlags()).rejects.toThrow('File not found');
      expect(fs.promises.readFile).toHaveBeenCalledTimes(3);
    });
  });

  describe('writeFeatureFlags', () => {
    it('should write new features to the file and return the updated features', async () => {
      const existingFeatures = { featureA: true };
      const newFeatures = { featureB: false };
      const updatedFeatures = { ...existingFeatures, ...newFeatures };

      (fs.promises.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(existingFeatures));
      (fs.promises.writeFile as jest.Mock).mockResolvedValueOnce(undefined);

      const result = await writeFeatureFlags(newFeatures);

      expect(result).toEqual(updatedFeatures);
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(updatedFeatures, null, 2),
        'utf-8'
      );
    });

    it('should write features to the file if no existing features are present', async () => {
      const newFeatures = { featureA: true };

      (fs.promises.readFile as jest.Mock).mockResolvedValueOnce('');
      (fs.promises.writeFile as jest.Mock).mockResolvedValueOnce(undefined);

      const result = await writeFeatureFlags(newFeatures);

      expect(result).toEqual(newFeatures);
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(newFeatures, null, 2),
        'utf-8'
      );
    });

    it('should throw an error if writing to the file fails', async () => {
      const newFeatures = { featureA: true };
      const mockError = new Error('Write failed');

      (fs.promises.readFile as jest.Mock).mockResolvedValueOnce('');
      (fs.promises.writeFile as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(writeFeatureFlags(newFeatures)).rejects.toThrow('Write failed');
      expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
    });
  });
});
