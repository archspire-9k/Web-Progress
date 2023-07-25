import { Color4, Engine, Scene, UniversalCamera, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Button } from "@babylonjs/gui/2D/controls/button";
import _goToStart from "./Start";
import State from "./State";

export default async function _goToLose(engine: Engine, scene: Scene) {
    engine.displayLoadingUI();

    //--SCENE SETUP--
    scene.detachControl();
    let newScene = new Scene(engine);
    newScene.clearColor = new Color4(0, 0, 0, 1);
    let camera = new UniversalCamera('camera1', Vector3.Zero(), newScene);
    camera.setTarget(Vector3.Zero());

    //--GUI--
    const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const mainBtn = Button.CreateSimpleButton('mainBtn', "MAIN MENU");
    mainBtn.height = "40px";
    mainBtn.color = "white";
    guiMenu.addControl(mainBtn);
    //this handles interactions with the start button attached to the scene
    mainBtn.onPointerUpObservable.add(() => {
        _goToStart({ engine, scene });
    });

    //--SCENE FINISHED LOADING--
    await newScene.whenReadyAsync();
    engine.hideLoadingUI(); //when the scene is ready, hide loading
    //lastly set the current state to the lose state and set the scene to the lose scene
    scene.dispose();

    return {
        scene: newScene,
        state: State.LOSE
    }

}