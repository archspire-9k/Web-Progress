import { ActionManager, ExecuteCodeAction, Scene, Sprite } from "@babylonjs/core";

export default class CharacterMovement {

    keyStatus = {
        w: false,
        s: false,
        a: false,
        d: false,
        Shift: false
    }

    constructor(scene: Scene, character: Sprite) {
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
            if (this.keyStatus.d) {
                character.position._x -= 0.1;
            }
            else if (this.keyStatus.a) {
                character.position._x += 0.1;
            }
            else if (this.keyStatus.w) {
                character.position._z -= 0.1;
            }
            else if (this.keyStatus.s) {
                character.position._z += 0.1;
            }
        })
    };

}