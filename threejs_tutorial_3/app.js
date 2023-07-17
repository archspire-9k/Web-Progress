import * as THREE from 'three';
import { gsap } from "gsap";
import { Expo } from 'gsap';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';



var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

const axis = new THREE.AxesHelper(5);
scene.add(axis);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const planeGeometry = new THREE.PlaneGeometry(60, 60);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide })
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFF })
const box = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(box);

const sphereGeometry = new THREE.SphereGeometry(4, 60, 60);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xFFF });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;

scene.add(sphere);
sphere.position.set(3, 10, -13)

const ambienceLight = new THREE.AmbientLight(0x375243);
scene.add(ambienceLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(40, 30, -90);
directionalLight.castShadow = true;
directionalLight.shadow.camera.top = 12;
directionalLight.shadow.camera.right = 12;

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);

const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directionalLightShadowHelper);

const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01
};

gui.addColor(options, 'sphereColor').onChange(function(e) {
     sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e) {
    sphere.material.wireframe = e;
});

gui.add(options, "speed", 0, 0.1);

var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 2, 40);
controls.update();

let isMouseDown = false;

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

    if (isMouseDown) {

    }
}

function onPointerDown() {
    isMouseDown = true;
}

function onPointerUp() {
    isMouseUp = false;
}

let step = 0;

var render = function () {
    requestAnimationFrame(render);
    // put animation(s) here
    box.rotation.x += 0.05;
    box.rotation.y += 0.01;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));
    renderer.render(scene, camera);
}

render();

// window.addEventListener('mousemove', onPointerMove);