import { platformEntity as platform, platforms } from './Platform';
import { gameEntity as game, games } from "./Game";

game.define({ platforms })

platform.define({ games });

export {game, platform}