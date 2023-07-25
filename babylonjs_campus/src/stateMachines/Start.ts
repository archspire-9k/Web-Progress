import { BackgroundMaterial, Color3, Engine, HemisphericLight, MeshBuilder, Scene, Sprite, SpriteManager, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import createScene from "../createScene";
import State from "./State";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { Button } from "@babylonjs/gui/2D/controls/button";
import _goToQuad from "./Quad";

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
        _goToQuad(engine, scene, setScene, setState);
    });

    // render meshes here
    // TODO: change this to a function
    const ground = MeshBuilder.CreateGround('ground', { width: 30, height: 30, subdivisions: 5 }, newScene);
    const groundMaterial = new StandardMaterial('', newScene);
    groundMaterial.diffuseColor = Color3.Green();
    ground.material = groundMaterial;

    const characterManager = new SpriteManager('character', "./sprites/knight_idle.png", 1, 42, newScene);
    characterManager.pixelPerfect = true;
    const character = new Sprite("player", characterManager);
    character.position.set(0, 1, 0);
    character.playAnimation(0, 3, true, 375);

    // render light here
    const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), newScene);

    await newScene.whenReadyAsync();
    engine.hideLoadingUI();

    //lastly set the current state to the start state and set the scene to the start scene
    scene.dispose();
    setScene(newScene);
    setState(State.START);

}