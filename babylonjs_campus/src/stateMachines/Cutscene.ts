import { Color3, Color4, Engine, HemisphericLight, MeshBuilder, Scene, SceneLoader, StandardMaterial, UniversalCamera, Vector3 } from "@babylonjs/core";
import State from "./State";

export default async function _goToCutscene(engine: Engine, scene: Scene, setScene: Function, setState: Function) {
    engine.displayLoadingUI();

    //--SETUP SCENE--
    //dont detect any inputs from this ui while the game is loading
    scene.detachControl();
    let _cutScene = new Scene(engine);
    let camera = new UniversalCamera("camera1", Vector3.Zero(), _cutScene);
    camera.setTarget(Vector3.Zero());
    _cutScene.clearColor = new Color4(0, 0, 100, 1);

    // render light here
    // const targetLight = new PointLight("light", new Vector3(0, 0.5, 0), scene);
    const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), _cutScene);

    // SceneLoader.ImportMeshAsync("", "./low_poly_city/", "scene.gltf", _cutScene);

    const box = MeshBuilder.CreateBox("box", { size: 0.25 }, _cutScene)
    const boxMaterial = new StandardMaterial('boxMaterial', _cutScene);
    boxMaterial.diffuseColor = Color3.Gray();
    box.material = boxMaterial;

    await _cutScene.whenReadyAsync();
    engine.hideLoadingUI();

    //lastly set the current state to the start state and set the scene to the start scene
    scene.dispose();
    setScene(_cutScene);
    setState(State.CUTSCENE);

}