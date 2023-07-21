import { Color3, GizmoManager, Scene, StandardMaterial } from '@babylonjs/core';
import { Engine } from '@babylonjs/core';
import { ArcRotateCamera } from '@babylonjs/core';
import { Vector3, Color4 } from '@babylonjs/core';

export default function createScene(engine: Engine) {
    const scene = new Scene(engine);

    scene.clearColor = Color4.FromHexString('#cdd1dd');

    const gizmoManager = new GizmoManager(scene, 1);
    gizmoManager.rotationGizmoEnabled = true;

    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    camera.attachControl(true);
    camera.inputs.addMouseWheel();

    // add events here
    scene.onPointerDown = function rayCast() {
        const hit = scene.pick(scene.pointerX, scene.pointerY);

        if (hit.pickedMesh?.name === 'box' && hit.pickedMesh.material instanceof StandardMaterial) {
            hit.pickedMesh.material.diffuseColor = Color3.Red();
        }
    }

    return scene;
}