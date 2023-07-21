import { Scene } from '@babylonjs/core';
import { Engine } from '@babylonjs/core';
import { PointLight } from '@babylonjs/core';
import { ArcRotateCamera } from '@babylonjs/core';
import { Vector3, Color4 } from '@babylonjs/core';

export default function createScene(engine: Engine) {
    const scene = new Scene(engine);

    scene.clearColor = Color4.FromHexString('#cdd1dd');

    const light = new PointLight("Light", new Vector3(0, 0.5, 0), scene);

    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    camera.attachControl(true);
    camera.inputs.addMouseWheel();


    return scene;
}