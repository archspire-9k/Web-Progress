import { ActionManager, ExecuteCodeAction, Scene, Sprite, Vector2 } from "@babylonjs/core";

export default class CharacterMovement {

    private _keyStatus = {
        w: false,
        s: false,
        a: false,
        d: false,
        Shift: false
    }

    //player movement vars
    private _deltaTime: number = 0;
    private _h: number;
    private _v: number;
    
    // store current movement direction
    private _moveDirection = Vector2.Zero();


    constructor(scene: Scene, character: Sprite) {
        scene.actionManager = new ActionManager(scene);

        scene.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (event) => {
                let key = event.sourceEvent.key;
                if (key !== "Shift") {
                    key = key.toLowerCase();
                }
                if (key in this._keyStatus) {
                    this._keyStatus[key] = true;
                }
                console.log(this._keyStatus);
            }));

        scene.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (event) => {
                let key = event.sourceEvent.key;
                if (key !== "Shift") {
                    key = key.toLowerCase();
                }
                if (key in this._keyStatus) {
                    this._keyStatus[key] = false;
                }
                console.log(this._keyStatus);
            })
        );

        scene.onBeforeRenderObservable.add(() => {
            // if (this._keyStatus.d) {
            //     character.position._x -= 0.1;
            // }

            if (!this._keyStatus.w && this._keyStatus.s) {
                character.position._z += 0.1;
            }
            else if (this._keyStatus.w || this._keyStatus.a || this._keyStatus.d) {
                character.position._z -= 0.1;
            }
            if (this._keyStatus.a) {
                character.position._x += 0.1;
            }
        })
    };

    private getDirection() {

        
    }

}