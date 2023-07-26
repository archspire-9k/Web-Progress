import { ActionManager, ExecuteCodeAction, Scene, Vector2 } from "@babylonjs/core";

export default class CharacterMovement {

    public keyStatus = {
        w: false,
        s: false,
        a: false,
        d: false,
        Shift: false
    }

    public currentAnim: string;

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

        //forward - backwards movement
        if (this.keyStatus.w && !this.keyStatus.s) {
            this.verticalAxis = 1;
            this.inputVector.y = 1;
            // this.inputVector.y = Scalar.Lerp(this.inputVector.y, 1, 0.2);
            this.currentAnim = "up";
        } else if (this.keyStatus.s && !this.keyStatus.w) {
            // this.inputVector.y = Scalar.Lerp(this.inputVector.y, -1, 0.2);
            this.verticalAxis = -1;
            this.inputVector.y = -1;
            this.currentAnim = "down";
        } else {
            this.inputVector.y = 0;
            this.verticalAxis = 0;
            this.currentAnim = "idlevertical";
        }

        //left - right movement
        if (this.keyStatus.a && !this.keyStatus.d) {
            //lerp will create a scalar linearly interpolated amt between start and end scalar
            //taking current horizontal and how long you hold, will go up to -1(all the way left)
            // this.inputVector.x = Scalar.Lerp(this.inputVector.x, -1, 0.2);
            this.inputVector.x = -1;
            this.horizontalAxis = -1;
            this.currentAnim = "left";
        } else if (this.keyStatus.d && !this.keyStatus.a) {
            // this.inputVector.x = Scalar.Lerp(this.inputVector.x, 1, 0.2);
            this.inputVector.x = 1;
            this.horizontalAxis = 1;
            this.currentAnim = "right";
        }
        else{
            this.inputVector.x = 0;
            this.horizontalAxis = 0;

            if (this.currentAnim === "idlevertical") {
                this.currentAnim = "idle";
            }
        }

        this.inputVector.normalize();
        console.log(this.currentAnim);
    }

}