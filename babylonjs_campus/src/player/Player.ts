import { Scene, Sprite } from "@babylonjs/core";
import CharacterMovement from "./CharacterMovement";

export default class Player {
    private _input : CharacterMovement; 

    private _player: Sprite;

    constructor(scene: Scene, player: Sprite) {
        this._input = new CharacterMovement(scene);
        this._player = player;
    }
}