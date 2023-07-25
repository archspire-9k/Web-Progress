import { Color3, Engine, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import createScene from "../createScene";
import State from "./State";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { Button } from "@babylonjs/gui/2D/controls/button";
import _goToCutscene from "./Quad";

export default async function _goToStart(engine: Engine, scene: Scene, setScene: Function, setState: Function) {
    engine.displayLoadingUI();

    //--SCENE SETUP--
    //dont detect any inputs from this ui while the game is loading
    scene.detachControl();
    let newScene = createScene(engine);

    //--GUI--
    const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    guiMenu.idealHeight = 720;

    //create a simple button
    const startBtn = Button.CreateSimpleButton("start", "PLAY");
    startBtn.width = 0.2;
    startBtn.height = "40px";
    startBtn.color = "white";
    startBtn.top = "-14px";
    startBtn.thickness = 0;
    startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    guiMenu.addControl(startBtn);

    // navigate to cutscene
    startBtn.onPointerDownObservable.add(() => {
        _goToCutscene(engine, scene, setScene, setState);


    });

    // render meshes here
    // TODO: change this to a function
    const box = MeshBuilder.CreateBox("box", { size: 0.25 }, newScene)
    const boxMaterial = new StandardMaterial('boxMaterial', newScene);
    boxMaterial.diffuseColor = Color3.Gray();
    box.material = boxMaterial;

    // render light here
    // const targetLight = new PointLight("light", new Vector3(0, 0.5, 0), scene);
    const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), newScene);

    await newScene.whenReadyAsync();
    engine.hideLoadingUI();

    //lastly set the current state to the start state and set the scene to the start scene
    scene.dispose();
    setScene(newScene);
    setState(State.START);

}