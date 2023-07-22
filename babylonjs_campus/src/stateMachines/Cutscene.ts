import { Color4, Engine, Scene, UniversalCamera, Vector3 } from "@babylonjs/core";

export default async function _goToCutscene(engine: Engine, scene: Scene) {
    engine.displayLoadingUI();

    //--SETUP SCENE--
    //dont detect any inputs from this ui while the game is loading
    scene.detachControl();
    const _cutScene = new Scene(engine);
    let camera = new UniversalCamera("camera1", Vector3.Zero(), _cutScene);
    camera.setTarget(Vector3.Zero());
    _cutScene.clearColor = new Color4(0, 0, 0, 1);

    await _cutScene.whenReadyAsync();
    engine.hideLoadingUI();

    //lastly set the current state to the start state and set the scene to the start scene
    scene.dispose();


    return {
        engine: engine,
        scene: scene
    }

}