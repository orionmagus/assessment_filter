import { Index, IndexedObject } from './util_types';
import { ensureArray } from "./array";
const PROP_REGEX = /[\/.\[\]]+?/gi,
  INT_REGEX = /^[\-\d]+$/g;
type TKeys = string | string[];
type SplitProps = (keys: TKeys, reg?: RegExp) => string[];

type Ts = (s: string) => number | TKeys;
type TCheck = (v: any) => boolean;
type RegCheck = (v: any) => boolean;
export const isString: TCheck = (v) => !!v && typeof v === 'string',
  isNull: TCheck = (v) => v === null || v === undefined || Number.isNaN(v),
  isPropPath: RegCheck = (v) => PROP_REGEX.test(v),
  isObject: TCheck = (v) => !!v && typeof v === 'object',
  isNumber: TCheck = (v) => !!v && typeof v === 'number';
export const asString = (v: any, _def: string = '') =>
    `${isNull(v) ? _def : isString(v) ? v : v}`,
  asNumber = (v: string) =>
    /^[\-\d.]+$/.test(v)
      ? v.indexOf('.') === -1
        ? parseInt(v, 10)
        : parseFloat(v)
      : v,
  asInt = (v: Index, _def: string = '0'): number =>
    (isString(v)
      ? asString(v, _def).indexOf('.') !== -1
        ? Math.round(parseFloat(asString(v, _def)))
        : parseInt(`${v}`, 10)
      : Math.round(v as number)) as number; 
export const keySplit: SplitProps = (keys = '', reg = PROP_REGEX) =>
  Array.isArray(keys) ? keys : ensureArray(keys.split(reg).filter((v) => v.length > 0));
export const formatDate: Ts = (s = 'dec 5, 2019') => {
    let [M, d, y] = new Date(Date.parse(s)).toString().split(' ').slice(1, 4);
    return `${M} ${d}, ${y}`;
  },
  titleCase: Ts = (str: string = '') =>
    str
      .split(/\s/g)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' '),
  formatProxy = (frmt: any = {}) => {
    let handler = (target:IndexedObject, prop:PropertyKey) => {
      let ret = target[prop]
      if (prop in frmt) {
        return frmt[prop](ret);
      }
      return ret;
    };
    return (o: any) => Object.keys(o).reduce((acc:any, k:PropertyKey)=>({...acc,[k]: handler(o, k)}), {});
  },
  formatCollection = (frmt: any = {}) => {
    let frmttr = formatProxy(frmt);
    return (o: any[]) => !!o && Array.isArray(o)?o.map(frmttr): [];
  };
export const getIn = (keys: TKeys | IndexedObject, _default: any = null):any => {
  
    let skeys = keySplit(keys as TKeys);
    let objM = (a: any, c: any) => c in a && a[c];
    let arrM = (a: any[], c: number | string) => a[asInt(c) % a.length];
    return (o: any, _def: any = _default) =>
      skeys.reduce(
        (a, c) =>
          Array.isArray(a) && INT_REGEX.test(c)
            ? arrM(a, c)
            : isObject(a)
            ? objM(a, c)
            : undefined,
        o,
      ) || _def;
  },
  hasSome = (arr0: any[], arr1: any[]):boolean => arr1.some((v) => arr0.includes(v));
