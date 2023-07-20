import * as BABYLON from '@babylonjs/core';

export default function createScene(engine: BABYLON.Engine) {
    const scene = new BABYLON.Scene(engine);

    return scene;
}