import { ArcRotateCamera, BackgroundMaterial, Color3, Color4, Engine, HemisphericLight, MeshBuilder, Scene, Sprite, SpriteManager, SpriteMap, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import State from "./State";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { Button } from "@babylonjs/gui/2D/controls/button";
import _goToQuad from "./Quad";
import CharacterMovement from "../player/Movement";
import Player from "../player/Player";

export default async function _goToStart(engine: Engine, scene: Scene, setScene: Function, setState: Function) {
    engine.displayLoadingUI();

    //--SCENE SETUP--
    //dont detect any inputs from this ui while the game is loading
    scene.detachControl();
    const newScene = new Scene(engine);

    newScene.clearColor = Color4.FromHexString('#cdd1dd');

    // add events here
    // scene.onPointerDown = function rayCast() {
    //     const hit = scene.pick(scene.pointerX, scene.pointerY);

    //     if (hit.pickedMesh?.name === 'box' && hit.pickedMesh.material instanceof StandardMaterial) {
    //         hit.pickedMesh.material.diffuseColor = Color3.Red();
    //     }
    // }


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

    const characterManager = new SpriteManager('character', "./sprites/SpriteSheet.png", 1, { width: 23.2222, height: 36.2222 }, newScene);
    characterManager.pixelPerfect = true;
    const character = new Sprite("player", characterManager);
    character.width = 0.6411;
    character.position.set(0, 0.45, 0);

    // implement movement here
    const player = new Player(newScene, character);

    const camera = player.activatePlayerCamera(newScene);

    // render light here
    const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), newScene);

    await newScene.whenReadyAsync();
    engine.hideLoadingUI();

    //lastly set the current state to the start state and set the scene to the start scene
    scene.dispose();
    setScene(newScene);
    setState(State.START);

}