import * as THREE from 'three';
import { gsap } from "gsap";
import { Expo } from 'gsap';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';



var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.setPath('./isometric_office/');
loader.load('untitled.gltf', function (gltf) {

    scene.add(gltf.scene);

    render();

});


var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-5, 5, 19);
controls.update();

let cameraRadius = 20;
let cameraAzimuth = 0;
let cameraElevation = 0;
let isMouseDown = false;
let previousMouseX = 0;
let previousMouseY = 0;

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

    // // update the picking ray with the camera and pointer position
    // raycaster.setFromCamera(pointer, camera);

    // // calculate objects intersecting the picking ray
    // var intersects = raycaster.intersectObjects(scene.children, true);

    // for (let i = 0; i < intersects.length; i++) {
    //     // change color on method call
    //     // intersects[i].object.material.color.set(0xff0000);

    //     var tl = gsap.timeline();
    //     tl.to(intersects[i].object.scale, { duration: 1, x: 4, ease: Expo.easeOut });
    //     tl.to(intersects[i].object.scale, { duration: 0.5, x: 0.5, ease: Expo.easeOut });
    //     tl.to(intersects[i].object.position, { duration: 2, x: 2, ease: Expo.easeOut });
    //     tl.to(intersects[i].object.rotation, { duration: 0.25, y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5");
    // }
    if (isMouseDown) {

    }
}

function onPointerDown() {
    isMouseDown = true;
}

function onPointerUp() {
    isMouseUp = false;
}

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(0, -5, 0);

scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000);
light.position.set(0, 5, 25);

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