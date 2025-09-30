/**
 * Saves a value to localStorage after serializing it to JSON.
 *
 * @template T - The type of the value being stored.
 * @param {string} key - The localStorage key under which the value will be saved.
 * @param {T} value - The value to store in localStorage.
 */
export const persistLocalStorage = <T,>(key: string, value: T):void => {
    localStorage.setItem(key, JSON.stringify({...value}));
}

/**
 * Retrieves and parses a value from localStorage.
 *
 * @param {string} key - The localStorage key from which to retrieve the value.
 * @returns {any | null} The parsed value from localStorage, or null if the key does not exist.
 */
export const getLocalStorage = (key: string) => {
    const storageItem = localStorage.getItem(key);
    if(!storageItem) return null;
    return JSON.parse(storageItem);
}

/**
 * Removes a value from localStorage.
 *
 * @param {string} key - The localStorage key to remove.
 */
export const clearLocalStorage = (key: string):void => {
    localStorage.removeItem(key);
}