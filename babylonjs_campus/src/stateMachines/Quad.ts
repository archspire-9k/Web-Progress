import { ArcRotateCamera, Color3, Color4, Engine, HemisphericLight, MeshBuilder, Scene, SceneLoader, StandardMaterial, UniversalCamera, Vector3 } from "@babylonjs/core";
import State from "./State";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { Button } from "@babylonjs/gui/2D/controls/button";
import _goToLectureHall from "./LectureHall";

export default async function _goToQuad(engine: Engine, scene: Scene, setScene: Function, setState: Function) {
    engine.displayLoadingUI();

    //--SETUP SCENE--
    //dont detect any inputs from this ui while the game is loading
    scene.detachControl();
    let _cutScene = new Scene(engine);
    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), _cutScene);
    camera.attachControl(true);
    camera.inputs.addMouseWheel();
    _cutScene.clearColor = new Color4(0, 0, 100, 1);

     //--GUI--
     const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
     guiMenu.idealHeight = 720;
 
     //create a simple button
     const startBtn = Button.CreateSimpleButton("hall", "Lecture Hall");
     startBtn.width = 0.2;
     startBtn.height = "40px";
     startBtn.color = "white";
     startBtn.top = "-14px";
     startBtn.thickness = 0;
     startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
     guiMenu.addControl(startBtn);
 
     // navigate to cutscene
     startBtn.onPointerDownObservable.add(() => {
         _goToLectureHall(engine, scene, setScene, setState);
     });
     
    // render light here
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
    setState(State.QUAD);

}