import { describe, expect, test } from 'vitest';
import { AppDataSource } from '../data-source';

describe('Database connection', () => {
  test('Should connect when create connection with database', () => {
    let isConnected = false;

    AppDataSource.initialize()
      .then(() => (isConnected = true))
      .catch(() => (isConnected = false));

    expect(isConnected).toEqual(true);
  });
});
