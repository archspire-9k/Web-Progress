import { Color3, Color4, Engine, FreeCamera, HemisphericLight, LightGizmo, MeshBuilder, PointLight, Scene, StandardMaterial, UtilityLayerRenderer, Vector3 } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import createScene from './createScene';

import State from './stateMachines/State';
import _goToStart from './stateMachines/goToStart';

class App {
    // General Entire Application
    private _scene: Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;

    //Scene - related
    private _state: number = 0;
    private _gamescene: Scene;
    private _cutScene: Scene;

    //post process
    private _transition: boolean = false;

    constructor() {
        this._canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
        this._engine = new Engine(this._canvas);
        this._scene = new Scene(this._engine);

        // Watch for browser/canvas resize events
        window.addEventListener("resize", () => {
            this._engine.resize();
        });

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "I") {
                if (this._scene.debugLayer.isVisible()) {
                    this._scene.debugLayer.hide();
                } else {
                    this._scene.debugLayer.show();
                }
            }
        });

        // implement main logic here
        this._mainLogic();
    }

    private async _mainLogic() {
        //get the state and scene from start state
        await _goToStart(this._engine, this._scene)
            .then(result => {
                this._scene = result.scene;
                this._state = result.state;
            });

        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // render meshes here
        // TODO: change this to a function
        const box = MeshBuilder.CreateBox("box", { size: 0.25 }, this._scene)
        const boxMaterial = new StandardMaterial('boxMaterial', this._scene);
        boxMaterial.diffuseColor = Color3.Gray();
        box.material = boxMaterial;

        // render light here
        // const targetLight = new PointLight("light", new Vector3(0, 0.5, 0), scene);
        const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), this._scene);

        const utilLayer = new UtilityLayerRenderer(this._scene);
        const lightGizmo: LightGizmo = new LightGizmo(utilLayer);
        lightGizmo.light = light1;

    }
}

new App();


