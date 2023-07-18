import * as THREE from 'three';
import { gsap } from "gsap";
import { Expo } from 'gsap';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setClearColor(0xe5e5e5);

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();



const axis = new THREE.AxesHelper(5);
scene.add(axis);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    top: 0,
    bottom: -12,
    right: 0,
    left: -12
};

gui.add(options, "speed", 0, 0.1);

gui.add(options, "angle", 0, 1);

gui.add(options, "penumbra", 0, 1);

gui.add(options, "intensity", 0, 1);

gui.add(options, "top", -20, 20);
gui.add(options, "bottom", -20, 20);
gui.add(options, "left", -20, 20);
gui.add(options, "right", -20, 20);

gui.add(options, "positionX", -30, 30);
gui.add(options, "positionY", -30, 30);
gui.add(options, "positionZ", -30, 30);





const loader = new GLTFLoader();

loader.load(
    './isometric_office/untitled.gltf',
    function (gltf) {
        // gltf.scene.scale.set(0.008, 0.008, 0.008);
        scene.add(gltf.scene);
    },
    undefined,
    // called when loading has errors
    function (error) {

        console.log('An error happened');

    }
)

// const ambienceLight = new THREE.AmbientLight();
// ambienceLight.intensity = 0.01;
// scene.add(ambienceLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-20, 30, 30);
directionalLight.castShadow = true;

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);

const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directionalLightShadowHelper);

// const spotLight = new THREE.SpotLight();
// scene.add(spotLight);
// spotLight.position.set(3, 30, -30);
// spotLight.castShadow = true;

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

//add fog
// scene.fog = new THREE.Fog(0xffffff, 0, 200);

//add fog exp2: grow exponentially to camera position
// scene.fog = new THREE.FogExp2(0xffffff, 0.01);

var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, 40);
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

    // // update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);

    // // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children, true);

    // put animation(s) here

    for (let i = 0; i < intersects.length; i++) {
        // change color on method call
        intersects[i].object.material.color.set(0xe5e5e5);
    }

    step += options.speed;


    // spotLight.angle = options.angle;
    // spotLight.penumbra = options.penumbra;
    // spotLight.intensity = options.intensity;
    directionalLight.intensity = options.intensity;
    directionalLight.shadow.camera.bottom = options.bottom;
    directionalLight.shadow.camera.top = options.top;
    directionalLight.shadow.camera.right = options.right;
    directionalLight.shadow.camera.left = options.left;
    directionalLightHelper.update();

    renderer.render(scene, camera);
}

render();

window.addEventListener('click', onPointerMove);