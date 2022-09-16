import { IndexedObject } from './util_types';
import { identity } from './selectors';
import { useState, useCallback, useMemo } from 'react';

export const sum = (arr: Array<any>) => arr.reduce((a, v) => a + v, 0);

export const ensureArray = (b: any, fn = (v: any) => [v]) =>
  Array.isArray(b) ? b : fn(b);


export const orderBy = (attr: PropertyKey | null = null, asc = true) => {
  const ident = identity(attr);
  return asc
    ? (a: any, b: any) => ident(b) - ident(a)
    : (a: any, b: any) => ident(a) - ident(b);
};
export const makeSortComparator = <T extends IndexedObject>(
    sortKey: PropertyKey | null,
    asc: boolean = true,
  ) => {
    const comparer = orderBy(sortKey, asc);
    return (values: T[]) =>
      values.slice().sort(comparer)
  },
  useCreateSortHook = <T extends IndexedObject>(
    sortKey: PropertyKey | null = null,
    sortAsc: boolean = true,
  ) => {
    const [key, setKey] = useState<PropertyKey | null>(sortKey),
      [asc, setAsc] = useState(sortAsc);
      
    const comparator = useCallback(
      makeSortComparator(key, asc),
      [key, asc],
    );
    const [records, setRecords] = useState<T[]>([]);
    const data = useMemo(()=>comparator(records),[records]);
    return {
      data,
      toggleAsc: () => setAsc((prev) => !prev),
      sortBy: (sortKey: PropertyKey) => setKey(sortKey),
    };
  };
