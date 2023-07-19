import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-5, 5, 19);
controls.update();

// trigger renderer size camera aspect upon browser resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

// implement raycaster to allow cursor-object interaction 
var pointer = new THREE.Vector2();

function onPointerMove(event) {

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    event.preventDefault();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    if (isMouseDown) {

    }
}

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(0, 25, 0);

scene.add(light);

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}

render();

// window.addEventListener('mousemove', onPointerMove);