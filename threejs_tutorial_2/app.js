import * as THREE from 'three';
import { gsap } from "gsap";
import { Expo } from 'gsap';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// trigger renderer size camera aspect upon browser resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

// implement raycaster to allow cursor-object interaction 
var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2();

function onPointerMove(event) {

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    event.preventDefault();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {
        // change color on method call
        // intersects[i].object.material.color.set(0xff0000);

        var tl = gsap.timeline();
        tl.to(intersects[i].object.scale, { duration: 1, x: 4, ease: Expo.easeOut });
        tl.to(intersects[i].object.scale, { duration: 0.5, x: 0.5, ease: Expo.easeOut });
        tl.to(intersects[i].object.position, { duration: 2, x: 2, ease: Expo.easeOut });
        tl.to(intersects[i].object.rotation, { duration: 0.25, y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5");
    }
}

// define shape, material, and create mesh from them
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xf7f7f7 });

var boxX = -10;
for (let i = 0; i < 15; i++) {
    var box = new THREE.Mesh(geometry, material);
    box.position.x = (Math.random() - 0.5) * 10;
    box.position.y = (Math.random() - 0.5) * 10;
    box.position.z = (Math.random() - 0.5) * 10;
    scene.add(box);
    boxX += 1;
}

// position
// box.position.set(-2, 2, 0);

// rotation
// box.rotation.set(45, 0, 0);

// scale
// box.scale.set(1, 2, 1);

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(0, 0, 0);

scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000);
light.position.set(0, 0, 25);

scene.add(light);

var render = function () {
    requestAnimationFrame(render);

    // put animation(s) here
    // box.rotation.x += 0.05;
    // box.rotation.y += 0.01;
    // box.rotation.x -= 0.01;

    renderer.render(scene, camera);
}

render();

window.addEventListener('mousemove', onPointerMove);