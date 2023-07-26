import { Scene, Sprite, TransformNode, Vector2 } from "@babylonjs/core";
import CharacterMovement from "./CharacterMovement";

export default class Player {
    private _input: CharacterMovement;

    private _player: Sprite;

    //Camera
    private _camRoot: TransformNode;
    private _yTilt: TransformNode;

    //animations

    //TODO: add walk animation
    private _walk() {

    }

    private _idle() {
        this._player.playAnimation(0, 0, true, 375);
    };

    //const values
    private static readonly PLAYER_SPEED: number = 0.45;

    //player movement vars
    private _deltaTime: number = 0;
    private _h: number;
    private _v: number;

    private _moveDirection: Vector2 = new Vector2();
    private _inputAmt: number;

    constructor(scene: Scene, player: Sprite) {
        this._input = new CharacterMovement(scene);
        this._player = player;


    }

    private _updatePosition() {
        this._moveDirection = Vector2.Zero(); // vector that holds movement information
        this._h = this._input.inputVector.x; //x-axis
        this._v = this._input.inputVector.y; //z-axis

        //--MOVEMENTS BASED ON CAMERA (as it rotates)--
        let fwd = this._camRoot.forward;
        let right = this._camRoot.right;
        let correctedVertical = fwd.scaleInPlace(this._v);
        let correctedHorizontal = right.scaleInPlace(this._h);

        //movement based off of camera's view
        let move = correctedHorizontal.addInPlace(correctedVertical);
    }
}