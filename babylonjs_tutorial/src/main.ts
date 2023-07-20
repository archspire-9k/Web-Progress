import * as BABYLON from '@babylonjs/core';

import createScene from './createScene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new BABYLON.Engine(canvas);

const scene = createScene(engine);

scene.createDefaultLight();

const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 3, -10), scene);
camera.attachControl(true);
camera.inputs.addMouseWheel();
camera.setTarget(BABYLON.Vector3.Zero());

// sphere mesh
const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 1, segments: 32}, scene);
sphere.position.set(0, 2, 2);

// Built-in 'ground' shape.
const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "./src/assets/img/heightmap.png",
{width: 6, height: 6, subdivisions: 50}, scene);

ground.material = new BABYLON.StandardMaterial("groundMaterial" , scene);
// ground.material.wireframe = true;

engine.runRenderLoop(() => {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});