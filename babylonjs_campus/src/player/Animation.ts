//TODO: add walk animation

import { Sprite } from "@babylonjs/core";

export function walkRight(player: Sprite) {
    player.playAnimation(1, 7, true, 142);
}

export function idle(player: Sprite) {
    player.playAnimation(0, 0, true, 142);
};