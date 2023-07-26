//TODO: add walk animation

import { Sprite } from "@babylonjs/core";

export default class CharacterAnimation {

    private _currentAnimation: String;

    constructor() {

    }

    public walkRight(player: Sprite) {
        if (this._currentAnimation !== "walkright") {
            player.playAnimation(1, 7, true, 142);
            this._currentAnimation = "walkright";
        }
        
    }

    public idle(player: Sprite) {
        player.playAnimation(0, 0, true, 142);
        this._currentAnimation = "idle";
    };
}