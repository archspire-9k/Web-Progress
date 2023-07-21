import { Color4, Engine, FreeCamera, Scene, Vector3 } from "@babylonjs/core";

export default function goToStart(engine: Engine, scene: Scene) {
    engine.displayLoadingUI();

    //--SCENE SETUP--
    //dont detect any inputs from this ui while the game is loading
    scene.detachControl();
    let newScene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 1);
    let camera = new FreeCamera("camera1", new Vector3(0, 0, 0), newScene);
    camera.setTarget(Vector3.Zero());
}