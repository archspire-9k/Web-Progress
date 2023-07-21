import { Color3, Engine, HemisphericLight, LightGizmo, MeshBuilder, PointLight, StandardMaterial, UtilityLayerRenderer, Vector3 } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import createScene from './createScene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new Engine(canvas);

const scene = createScene(engine);

// enum for states
enum State { START = 0, GAME = 1, LOSE = 2, CUTSCENE = 3 };

// render meshes here
// TODO: change this to a function
const box = MeshBuilder.CreateBox("box", { size: 0.25 }, scene)
const boxMaterial = new StandardMaterial('boxMaterial', scene);
boxMaterial.diffuseColor = Color3.Gray();
box.material = boxMaterial;

// render light here
// const targetLight = new PointLight("light", new Vector3(0, 0.5, 0), scene);
const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

const utilLayer = new UtilityLayerRenderer(scene);
const lightGizmo: LightGizmo = new LightGizmo(utilLayer);
lightGizmo.light = light1;

engine.runRenderLoop(() => {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

// hide/show the Inspector
window.addEventListener("keydown", (ev) => {
    // Shift+Ctrl+Alt+I
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "I") {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            scene.debugLayer.show();
        }
    }
});