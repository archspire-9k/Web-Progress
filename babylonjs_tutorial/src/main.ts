import * as BABYLON from '@babylonjs/core';

import createScene from './createScene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new BABYLON.Engine(canvas);

const scene = createScene(engine);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 255);

// const light = BABYLON.
scene.createDefaultEnvironment();

const camera = new BABYLON.ArcRotateCamera('camera', 0, Math.PI/2, 8, new BABYLON.Vector3(0, 0.5, 0), scene);
camera.attachControl(true);
camera.inputs.addMouseWheel();

// sphere mesh
const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 1, segments: 64 }, scene);
sphere.position.set(0, 0.5, 0);

const sphereMaterial = new BABYLON.PBRMaterial('sphereMaterial', scene);
sphereMaterial.roughness = 0;
sphereMaterial.metallic = 0;
sphereMaterial.subSurface.isRefractionEnabled = true;
sphereMaterial.subSurface.indexOfRefraction = 1.5;
sphereMaterial.subSurface.tintColor = new BABYLON.Color3(239, 239, 0);

sphere.material = sphereMaterial;


// Built-in 'ground' shape.
const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "./src/assets/img/waves.png",
    { width: 5, height: 5, subdivisions: 50 }, scene);

ground.material = new BABYLON.StandardMaterial("groundMaterial", scene);

engine.runRenderLoop(() => {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});