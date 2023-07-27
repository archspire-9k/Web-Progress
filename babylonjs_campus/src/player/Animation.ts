//TODO: add walk animation

import { Sprite } from "@babylonjs/core";

export default class CharacterAnimation {

    private _currentAnim: string = "idle";

    // combine the up down and left right animation indicator to play the specified animation
    public loadAnimation(player: Sprite, currentVerticalAnim: string, currentHorizontalAnim: string) {
        const temp = currentVerticalAnim + currentHorizontalAnim;
        if (this._currentAnim !== temp) {
            this._currentAnim = temp;
            this._playAnimation(player);
        }

    }

    private _playAnimation(player: Sprite) {
        switch (this._currentAnim) {
            //TODO: rename to idledown
            case "idleidle":
                player.playAnimation(0, 0, true, 125);
                break;
            case "upidle":
                player.playAnimation(37, 44, true, 125);
                break;
            case "downidle":
                player.playAnimation(1, 8, true, 125);
                break;
            case "idleleft":
                player.playAnimation(55, 62, true, 125);
                break;
            case "idleright":
                player.playAnimation(19, 26, true, 125);
                break;
            case "upleft":
                player.playAnimation(46, 53, true, 125);
                break;
            case "upright":
                player.playAnimation(28, 35, true, 125);
                break;
            case "downright":
                player.playAnimation(73, 80, true, 125);
                break;
            case "downleft":
                player.playAnimation(64, 71, true, 125);
                break;


            default:
                break;
        }

    };

}

