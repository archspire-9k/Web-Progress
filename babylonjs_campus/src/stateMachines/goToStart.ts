import { Color4, Engine, FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import createScene from "../createScene";
import State from "./State";

export default async function _goToStart(engine: Engine, scene: Scene) {
    engine.displayLoadingUI();

    //--SCENE SETUP--
    //dont detect any inputs from this ui while the game is loading
    scene.detachControl();
    let newScene = createScene(engine);
    scene.clearColor = new Color4(0, 0, 0, 1);
    
    await newScene.whenReadyAsync();
    engine.hideLoadingUI();

    //lastly set the current state to the start state and set the scene to the start scene
    scene.dispose();

    return {
        scene: newScene,
        state: State.START
    }
}