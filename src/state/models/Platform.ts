import { schema } from 'normalizr';
import { Indices } from '@app/utils';
import { Model } from './Model';
export interface Platform extends Model {
  title: string;
  icon: string;
  games: Indices;
}

export const platformEntity = new schema.Entity('platforms'), platforms=[platformEntity];
