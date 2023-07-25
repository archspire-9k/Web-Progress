import { ArcRotateCamera, Color3, Color4, Engine, HemisphericLight, MeshBuilder, Scene, SceneLoader, StandardMaterial, UniversalCamera, Vector3 } from "@babylonjs/core";
import State from "./State";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { Button } from "@babylonjs/gui/2D/controls/button";
import _goToGame from "./Game";

export default async function _goToLectureHall(engine: Engine, scene: Scene, setScene: Function, setState: Function) {
    engine.displayLoadingUI();

    //--SETUP SCENE--
    //dont detect any inputs from this ui while the game is loading
    scene.detachControl();
    let _cutScene = new Scene(engine);
    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), _cutScene);
    camera.attachControl(true);
    camera.inputs.addMouseWheel();
    _cutScene.clearColor = new Color4(0, 100, 0, 1);

     //--GUI--
     const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
     guiMenu.idealHeight = 720;
 
     //create a simple button
     const gameBtn = Button.CreateSimpleButton("game", "to game");
     gameBtn.width = 0.2;
     gameBtn.height = "40px";
     gameBtn.color = "white";
     gameBtn.top = "-14px";
     gameBtn.thickness = 0;
     gameBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
     guiMenu.addControl(gameBtn);
 
     // navigate to cutscene
     gameBtn.onPointerDownObservable.add(() => {
         _goToGame(engine, scene, setScene, setState);
     });
     
    // render light here
    const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), _cutScene);


    const box = MeshBuilder.CreateBox("box", { size: 0.25 }, _cutScene)
    const boxMaterial = new StandardMaterial('boxMaterial', _cutScene);
    boxMaterial.diffuseColor = Color3.Gray();
    box.material = boxMaterial;

    await _cutScene.whenReadyAsync();
    engine.hideLoadingUI();

    //lastly set the current state to the start state and set the scene to the start scene
    scene.dispose();
    setScene(_cutScene);
    setState(State.LECTUREHALL);

}