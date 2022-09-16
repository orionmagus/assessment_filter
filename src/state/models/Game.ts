import { schema } from 'normalizr';

import { Indices } from '@app/utils';
import { Model } from './Model';
export interface Game extends Model {
  title: string;
  image: string;
  genre: string;
  platforms: Indices;
}
export const gameEntity = new schema.Entity('games', {}),
  games = [gameEntity];

// definite normalizr entity schemas


