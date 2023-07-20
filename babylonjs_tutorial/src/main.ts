import * as BABYLON from '@babylonjs/core';

import createScene from './createScene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new BABYLON.Engine(canvas);

const scene = createScene(engine);

scene.createDefaultCameraOrLight(true, false, true);
// // Creates and positions a free camera
// const camera = new BABYLON.FreeCamera("camera1",
//     new BABYLON.Vector3(0, 5, -10), scene);
// // Targets the camera to scene origin
// camera.setTarget(BABYLON.Vector3.Zero());
// // This attaches the camera to the canvas
// camera.attachControl(canvas, true);

// sphere mesh
const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 1, segments: 32}, scene);

// Built-in 'ground' shape.
const ground = BABYLON.MeshBuilder.CreateGround("ground", 
{width: 6, height: 6, subdivisions: 30}, scene);

ground.material = new BABYLON.StandardMaterial("groundMaterial" , scene);
ground.material.wireframe = true;

engine.runRenderLoop(() => {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});