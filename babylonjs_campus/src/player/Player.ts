import { Scene, Sprite, TransformNode, UniversalCamera, Vector2 } from "@babylonjs/core";
import CharacterMovement from "./CharacterMovement";

export default class Player {
    private _input: CharacterMovement;
    private _scene: Scene;
    private _player: Sprite;

    //Camera
    private camera: UniversalCamera;
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
        this._scene = scene;

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

        this._moveDirection = new Vector2(move.normalize().x, move.normalize().z);

        //clamp the input value so that diagonal movement isn't twice as fast
        let inputMag = Math.abs(this._h) + Math.abs(this._v);
        if (inputMag < 0) {
            this._inputAmt = 0;
        } else if (inputMag > 1) {
            this._inputAmt = 1;
        } else {
            this._inputAmt = inputMag;
        }

        //final movement that takes into consideration the inputs
        this._moveDirection = this._moveDirection.scaleInPlace(this._inputAmt * Player.PLAYER_SPEED);
    }

    public activatePlayerCamera(): UniversalCamera {
        this._scene.registerBeforeRender(() => {
    
            this._beforeRenderUpdate();
            this._updateCamera();
    
        })
        return this.camera;
    }

    //--CAMERA--
    private _updateCamera(): void {
    }

    private _beforeRenderUpdate() {
        
    }
}