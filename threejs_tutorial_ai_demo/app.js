import * as THREE from 'three';

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);

camera.position.set(0, 20, 0);
camera.lookAt(scene.position);

// trigger renderer size camera aspect upon browser resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(0, 25, 0);

scene.add(light);

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}

render();