/**
 * Type-safe localStorage wrapper.
 * Provides abstraction layer for future migration to IndexedDB.
 *
 * Storage schema (all keys prefixed with `lofi-study:`):
 * - tasks: Task[]
 * - groups: Group[]
 * - pomodoro-config: PomodoroConfig
 * - theme: string (theme id)
 * - player-volume: number
 * - player-stream: string (stream id)
 */

const STORAGE_PREFIX = 'lofi-study:';

/**
 * Retrieves an item from localStorage with type safety
 * @param key - Storage key (without prefix)
 * @returns Parsed value or null if not found/error
 */
export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return null;
  }
}

/**
 * Saves an item to localStorage with type safety
 * @param key - Storage key (without prefix)
 * @param value - Value to store (will be JSON stringified)
 * @returns true on success, false on failure (e.g. quota exceeded, disabled)
 */
export function setItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error);
    return false;
  }
}

/**
 * Removes an item from localStorage
 * @param key - Storage key (without prefix)
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
  }
}

/**
 * Clears all items with the app prefix
 */
export function clearAll(): void {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing localStorage', error);
  }
}
