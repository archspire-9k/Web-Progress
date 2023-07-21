import { Color3, Engine, LightGizmo, MeshBuilder, PointLight, StandardMaterial, UtilityLayerRenderer, Vector3 } from '@babylonjs/core';

import createScene from './createScene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new Engine(canvas);

const scene = createScene(engine);

// const camera = new ArcRotateCamera('camera', 0, Math.PI / 2, 8, new Vector3(0, 0.5, 0), scene);

// render meshes here
const box = MeshBuilder.CreateBox("box", { size: 0.25 }, scene)
const boxMaterial = new StandardMaterial('boxMaterial', scene);
boxMaterial.diffuseColor = Color3.Gray();
// boxMaterial.emissiveColor = Color3.Gray();
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