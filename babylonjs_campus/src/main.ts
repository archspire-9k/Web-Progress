import { Color3, Engine, LightGizmo, MeshBuilder, PointLight, StandardMaterial, UtilityLayerRenderer, Vector3 } from '@babylonjs/core';

import createScene from './createScene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new Engine(canvas);

const scene = createScene(engine);

// render meshes here
// TODO: change this to a function
const box = MeshBuilder.CreateBox("box", { size: 0.25 }, scene)
const boxMaterial = new StandardMaterial('boxMaterial', scene);
boxMaterial.diffuseColor = Color3.Gray();
box.material = boxMaterial;

const targetLight = new PointLight("light", new Vector3(0, 0.5, 0), scene);

const utilLayer = new UtilityLayerRenderer(scene);

const lightGizmo: LightGizmo = new LightGizmo(utilLayer);
lightGizmo.light = targetLight;

engine.runRenderLoop(() => {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});