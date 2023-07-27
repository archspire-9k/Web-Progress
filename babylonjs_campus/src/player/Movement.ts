import { ActionManager, ExecuteCodeAction, Scene, Vector2 } from "@babylonjs/core";

export default class CharacterMovement {

    public keyStatus = {
        w: false,
        s: false,
        a: false,
        d: false,
        Shift: false
    }

    public currentHorizontalAnim: string;
    public currentVerticalAnim: string;

    //simple movement
    public inputVector = Vector2.Zero();
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
            })
        );

        scene.onBeforeRenderObservable.add(() => {
            this._getDirection();
        })
    };

    private _getDirection() {
        // diagonal movement
        // if (this.keyStatus.a && this.keyStatus.w) {
        //     this.currentAnim = "upleft";
        // } else if(this.keyStatus.a && this.keyStatus.s) {
        //     this.currentAnim = "downleft";
        // } else if (this.keyStatus.d && this.keyStatus.w) {
        //     this.currentAnim = "upright";
        // } else if(this.keyStatus.d && this.keyStatus.s) {
        //     this.currentAnim = "downright";
        // }

        //forward - backwards movement
        if (this.keyStatus.w && !this.keyStatus.s) {
            this.verticalAxis = 1;
            this.inputVector.y = 1;
            // this.inputVector.y = Scalar.Lerp(this.inputVector.y, 1, 0.2);
            this.currentVerticalAnim = "up";
        } else if (this.keyStatus.s && !this.keyStatus.w) {
            // this.inputVector.y = Scalar.Lerp(this.inputVector.y, -1, 0.2);
            this.verticalAxis = -1;
            this.inputVector.y = -1;
            this.currentVerticalAnim = "down";
        } else {
            this.inputVector.y = 0;
            this.verticalAxis = 0;
            this.currentVerticalAnim = "idle";
        }

        //left - right movement
        if (this.keyStatus.a && !this.keyStatus.d) {
            //lerp will create a scalar linearly interpolated amt between start and end scalar
            //taking current horizontal and how long you hold, will go up to -1(all the way left)
            // this.inputVector.x = Scalar.Lerp(this.inputVector.x, -1, 0.2);
            this.inputVector.x = -1;
            this.horizontalAxis = -1;
            this.currentHorizontalAnim = "left";
        } else if (this.keyStatus.d && !this.keyStatus.a) {
            // this.inputVector.x = Scalar.Lerp(this.inputVector.x, 1, 0.2);
            this.inputVector.x = 1;
            this.horizontalAxis = 1;
            this.currentHorizontalAnim = "right";
        }
        else {
            this.inputVector.x = 0;
            this.horizontalAxis = 0;
            this.currentHorizontalAnim = "idle";
        }

        this.inputVector.normalize();
    }

}