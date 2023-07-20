import * as BABYLON from '@babylonjs/core';

export default function createScene(engine: BABYLON.Engine) {
    const scene = new BABYLON.Scene(engine);

    //light 
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // sphere mesh
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 2, segments: 32}, scene);

    return scene;
}