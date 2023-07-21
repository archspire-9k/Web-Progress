import { Engine, MeshBuilder } from '@babylonjs/core';

import createScene from './createScene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new Engine(canvas);

const scene = createScene(engine);

// const camera = new ArcRotateCamera('camera', 0, Math.PI / 2, 8, new Vector3(0, 0.5, 0), scene);

// render meshes here
const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 30 }, scene)


engine.runRenderLoop(() => {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});