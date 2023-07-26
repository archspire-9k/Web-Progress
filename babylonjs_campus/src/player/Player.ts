import { Scene, Sprite, TransformNode } from "@babylonjs/core";
import CharacterMovement from "./CharacterMovement";

export default class Player {
    private _input: CharacterMovement;

    private _player: Sprite;

    //Camera
    private _camRoot: TransformNode;
    private _yTilt: TransformNode;

    //animations

    //TODO: add walk animation
    // private _walk() {
    // }

    private _idle() {
        this._player.playAnimation(0, 3, true, 375);
    };

    constructor(scene: Scene, player: Sprite) {
        this._input = new CharacterMovement(scene);
        this._player = player;
    }
}