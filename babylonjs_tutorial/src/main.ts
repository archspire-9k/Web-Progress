import * as BABYLON from '@babylonjs/core';

import createScene from './createScene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new BABYLON.Engine(canvas);

const scene = createScene(engine);

// Creates and positions a free camera
const camera = new BABYLON.FreeCamera("camera1",
    new BABYLON.Vector3(0, 5, -10), scene);
// Targets the camera to scene origin
camera.setTarget(BABYLON.Vector3.Zero());
// This attaches the camera to the canvas
camera.attachControl(canvas, true);


engine.runRenderLoop(() => {
    scene.render();
});