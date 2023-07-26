import { ActionManager, ExecuteCodeAction, Scalar, Scene, Sprite, Vector2 } from "@babylonjs/core";

export default class CharacterMovement {

    public keyStatus = {
        w: false,
        s: false,
        a: false,
        d: false,
        Shift: false
    }

    //simple movement
    public horizontal: number = 0;
    public vertical: number = 0;
    //tracks whether or not there is movement in that axis
    public horizontalAxis: number = 0;
    public verticalAxis: number = 0;

    constructor(scene: Scene) {
        scene.actionManager = new ActionManager(scene);

        scene.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (event) => {
                let key = event.sourceEvent.key;
                if (key !== "Shift") {
                    key = key.toLowerCase();
                }
                if (key in this.keyStatus) {
                    this.keyStatus[key] = true;
                }
                console.log(this.keyStatus);
            }));

        scene.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (event) => {
                let key = event.sourceEvent.key;
                if (key !== "Shift") {
                    key = key.toLowerCase();
                }
                if (key in this.keyStatus) {
                    this.keyStatus[key] = false;
                }
                console.log(this.keyStatus);
            })
        );

        scene.onBeforeRenderObservable.add(() => {
            this._getDirection();
        })
    };

    private _getDirection() {

        //forward - backwards movement
        if (this.keyStatus.w) {
            this.verticalAxis = 1;
            this.vertical = Scalar.Lerp(this.vertical, 1, 0.2);

        } else if (this.keyStatus.s) {
            this.vertical = Scalar.Lerp(this.vertical, -1, 0.2);
            this.verticalAxis = -1;
        } else {
            this.vertical = 0;
            this.verticalAxis = 0;
        }

        //left - right movement
        if (this.keyStatus.a) {
            //lerp will create a scalar linearly interpolated amt between start and end scalar
            //taking current horizontal and how long you hold, will go up to -1(all the way left)
            this.horizontal = Scalar.Lerp(this.horizontal, -1, 0.2);
            this.horizontalAxis = -1;

        } else if (this.keyStatus.d) {
            this.horizontal = Scalar.Lerp(this.horizontal, 1, 0.2);
            this.horizontalAxis = 1;
        }
        else {
            this.horizontal = 0;
            this.horizontalAxis = 0;
        }
    }

}