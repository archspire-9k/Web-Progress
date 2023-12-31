import { Color3, Engine, HemisphericLight, LightGizmo, MeshBuilder, Scene, SceneLoader, StandardMaterial, UtilityLayerRenderer, Vector3 } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import State from './stateMachines/State';
import _goToStart from './stateMachines/Start';

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


    private async _mainLogic(): Promise<void> {
        let setState = (state: State) => {
            this._state = state;
        }

        let setScene = (scene: Scene) => {
            this._scene = scene;
        }

        //get the state and scene from start state
        await _goToStart(this._engine, this._scene, setScene, setState);


        this._engine.runRenderLoop(() => {
            switch (this._state) {
                case State.START:
                    this._scene.render();
                    break;
                case State.QUAD:
                    this._scene.render();
                    break;
                // TODO: Implement Game state later
                // case State.GAME:
                //     //if 240seconds/ 4mins have have passed, go to the lose state
                //     if (this._ui.time >= 240 && !this._player.win) {
                //         this._goToLose();
                //         this._ui.stopTimer();
                //     }
                //     if (this._ui.quit) {
                //         this._goToStart();
                //         this._ui.quit = false;
                //     }
                //     this._scene.render();
                //     break;
                case State.LECTUREHALL:
                    this._scene.render();
                    break;
                default: break;
            }
        });

    }
}

new App();


