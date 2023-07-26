//TODO: add walk animation

import { Sprite } from "@babylonjs/core";

export default class CharacterAnimation {

    private _currentAnim: string = "idle";

    public loadAnimation(player: Sprite, currentAnim: string) {
        if (this._currentAnim !== currentAnim) {
            // player.playAnimation(1, 7, true, 125);
            this._currentAnim = currentAnim;
            this._playAnimation(player);
        }

    }

    private _playAnimation(player: Sprite) {
        switch (this._currentAnim) {
            //TODO: rename to idledown
            case "idle":
                player.playAnimation(0, 0, true, 125);
                break;
            case "up":
                player.playAnimation(37, 44, true, 125);
                break;
            case "down":
                player.playAnimation(1, 8, true, 125);
                break;
            case "left":
                player.playAnimation(55, 62, true, 125);
                break;
            case "right":
                player.playAnimation(19, 26, true, 125);
                break;
            default:
                break;
        }

    };

}

