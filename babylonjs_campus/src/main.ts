import { Color3, Engine, HemisphericLight, LightGizmo, MeshBuilder, PointLight, Scene, StandardMaterial, UtilityLayerRenderer, Vector3 } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import createScene from './createScene';




// enum for states
enum State { START = 0, GAME = 1, LOSE = 2, CUTSCENE = 3 };

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
        this._scene = createScene(this._engine);

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
        console.log(this._scene);
    }

    private _mainLogic() {

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

        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
    }
}

new App();


