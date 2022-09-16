import { IndexedObject } from './util_types';

export const identity =
  (attr: PropertyKey | null = null) =>
  (a: IndexedObject) =>
    attr === null ? a : a[attr];
