import { Scene, Sprite, TransformNode, UniversalCamera, Vector2, Vector3 } from "@babylonjs/core";
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
    private static readonly ORIGINAL_TILT: Vector3 = new Vector3(0.5934119456780721, 0, 0);

    //player movement vars
    private _deltaTime: number = 0;
    private _h: number;
    private _v: number;

    private _moveDirection: Vector2 = new Vector2();
    private _inputAmt: number;

    constructor(scene: Scene, player: Sprite) {
        this._input = new CharacterMovement(scene);
        this._player = player;
        this._setupPlayerCamera(scene);
        this._updatePosition();


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
        console.log(this._moveDirection);
    }

    public activatePlayerCamera(scene: Scene): UniversalCamera {
        scene.registerBeforeRender(() => {

            this._beforeRenderUpdate();
            this._updateCamera();

        })
        return this.camera;
    }

    //--CAMERA--
    private _setupPlayerCamera(scene: Scene): UniversalCamera {
        //root camera parent that handles positioning of the camera to follow the player
        this._camRoot = new TransformNode("root");
        this._camRoot.position = new Vector3(0, 0, 0); //initialized at (0,0,0)
        //to face the player from behind (180 degrees)
        this._camRoot.rotation = new Vector3(0, Math.PI, 0);

        //rotations along the x-axis (up/down tilting)
        let yTilt = new TransformNode("ytilt");
        //adjustments to camera view to point down at our player
        yTilt.rotation = Player.ORIGINAL_TILT;
        this._yTilt = yTilt;
        yTilt.parent = this._camRoot;

        //our actual camera that's pointing at our root's position
        this.camera = new UniversalCamera("cam", new Vector3(0, 0, -30), scene);
        this.camera.lockedTarget = this._camRoot.position;
        this.camera.fov = 0.47350045992678597;
        this.camera.parent = yTilt;

        scene.activeCamera = this.camera;
        return this.camera;
    }

    private _updateCamera(): void {
         //trigger areas for rotating camera view
        //  if (this._player.intersectsMesh(this.scene.getMeshByName("cornerTrigger"))) {
        //     if (this._input.horizontalAxis > 0) { //rotates to the right                
        //         this._camRoot.rotation = Vector3.Lerp(this._camRoot.rotation, new Vector3(this._camRoot.rotation.x, Math.PI / 2, this._camRoot.rotation.z), 0.4);
        //     } else if (this._input.horizontalAxis < 0) { //rotates to the left
        //         this._camRoot.rotation = Vector3.Lerp(this._camRoot.rotation, new Vector3(this._camRoot.rotation.x, Math.PI, this._camRoot.rotation.z), 0.4);
        //     }
        // }
        //rotates the camera to point down at the player when they enter the area, and returns it back to normal when they exit
        // if (this._player.intersectsMesh(this.scene.getMeshByName("festivalTrigger"))) {
        //     if (this._input.verticalAxis > 0) {
        //         this._yTilt.rotation = Vector3.Lerp(this._yTilt.rotation, Player.DOWN_TILT, 0.4);
        //     } else if (this._input.verticalAxis < 0) {
        //         this._yTilt.rotation = Vector3.Lerp(this._yTilt.rotation, Player.ORIGINAL_TILT, 0.4);
        //     }
        // }
        //once you've reached the destination area, return back to the original orientation, if they leave rotate it to the previous orientation
        // if (this._player.intersectsMesh(this.scene.getMeshByName("destinationTrigger"))) {
        //     if (this._input.verticalAxis > 0) {
        //         this._yTilt.rotation = Vector3.Lerp(this._yTilt.rotation, Player.ORIGINAL_TILT, 0.4);
        //     } else if (this._input.verticalAxis < 0) {
        //         this._yTilt.rotation = Vector3.Lerp(this._yTilt.rotation, Player.DOWN_TILT, 0.4);
        //     }
        // }

        //update camera postion up/down movement
        let centerPlayer = this._player.position.y + 2;
        this._camRoot.position = Vector3.Lerp(this._camRoot.position, new Vector3(this._player.position.x, centerPlayer, this._player.position.z), 0.4);
    }

    private _beforeRenderUpdate() {
        this._updatePosition();
        // this._animatePlayer();
    }
}