import * as THREE from 'three';

export function createCamera() {

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );

    return camera;
}

