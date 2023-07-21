import * as BABYLON from '@babylonjs/core';

import createScene from './createScene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new BABYLON.Engine(canvas);

const scene = createScene(engine);
scene.clearColor = BABYLON.Color4.FromHexString('#cdd1dd');

const lightRed = new BABYLON.PointLight("Light", new BABYLON.Vector3(0, 0.5, 0), scene);
lightRed.diffuse = BABYLON.Color3.FromHexString('#eb4225');
lightRed.specular = new BABYLON.Color3(0, 0, 0);

const camera = new BABYLON.ArcRotateCamera('camera', 0, Math.PI / 2, 8, new BABYLON.Vector3(0, 0.5, 0), scene);
camera.attachControl(true);
camera.inputs.addMouseWheel();

const env = {} as BABYLON.CubeTexture;
// add in IBL with linked environment
env.lighting = BABYLON.CubeTexture.CreateFromPrefilteredData("https://patrickryanms.github.io/BabylonJStextures/Demos/waterRefraction/assets/env/kloofendal_pureSky.env", scene);
env.lighting.name = "sky";
env.lighting.gammaSpace = false;
env.lighting.rotationY = 4.0823;
scene.environmentTexture = env.lighting;

// sphere mesh
const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 1, segments: 64 }, scene);
sphere.position = lightRed.position;

const sphereMaterial = new BABYLON.StandardMaterial('sphereMaterial', scene);
sphereMaterial.emissiveColor = BABYLON.Color3.FromInts(238, 237, 171);

sphere.material = sphereMaterial;

const utilLayer = new BABYLON.UtilityLayerRenderer(scene);

const positionGizmo = new BABYLON.PositionGizmo(utilLayer);
positionGizmo.attachedMesh = sphere;

// Built-in 'ground' shape.
const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "./src/assets/img/waves.png",
    { width: 5, height: 5, subdivisions: 100 }, scene);

var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
groundMaterial.diffuseColor = BABYLON.Color3.FromInts(42, 50, 61);
groundMaterial.specularColor = new BABYLON.Color3(1, 1, 1);

ground.material = groundMaterial;

engine.runRenderLoop(() => {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});