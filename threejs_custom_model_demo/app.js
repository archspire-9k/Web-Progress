import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { gsap } from 'gsap';
import { Expo } from 'gsap';
import * as dat from 'dat.gui';

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setClearColor(0xe5e5e5);

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0));

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
    positionY: 20,
    positionZ: 40,
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

gui.add(options, "positionX", -100, 100);
gui.add(options, "positionY", -100, 100);
gui.add(options, "positionZ", -100, 100);

const spotLight = new THREE.SpotLight();
spotLight.position.set(-3, 20, 3);
spotLight.castShadow = true;
scene.add(spotLight);

//Set up shadow properties for the light
spotLight.shadow.mapSize.width = 512; // default
spotLight.shadow.mapSize.height = 512; // default
spotLight.shadow.camera.near = 0.5; // default
spotLight.shadow.camera.far = 500; // default
spotLight.shadow.focus = 1; // default

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const spotLightShadowHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightShadowHelper);

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/examples/jsm/libs/draco/gltf');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.setPath('./city/');
loader.load('scene.gltf', function (gltf) {

    scene.add(gltf.scene);
    gltf.scene.scale.set(0.01, 0.01, 0.01)
    gltf.scene.receiveShadow = true;
    gltf.scene.castShadow = true;

    render();

},
    undefined,
    // called when loading has errors
    function (error) {

        console.log('An error happened');

    }
);

var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(options.positionX, options.positionY, options.positionZ);
controls.update();

let isMouseDown = false;

// trigger renderer size camera aspect upon browser resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

const tl = gsap.timeline();
function onPointerClick(event) {
    // tl.to(camera.position, {
    //     x: -4, duration: 1.5, onUpdate: function () {
    //         camera.lookAt(-4, 1.3, 10);
    //     }
    // })

    // tl.to(camera.position, {
    //     y: 1.3, duration: 1.5, onUpdate: function () {
    //         camera.lookAt(-4, 1.3, 10);
    //     }
    // })

    tl.to(camera.position, {
        x: -4,
        y: 1.3,
        z: 10,
        duration: 3,
        ease: Expo.easeOut
    })
}

// implement raycaster to allow cursor-object interaction 
var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2();
var position = new THREE.Vector3();

function onPointerMove(event) {
    event.preventDefault();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);

    raycaster.ray.intersectPlane(plane, position);

    spotLight.target.position.set(position.x, 0, position.z);

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

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    spotLightHelper.update();

    // camera.position.set(options.positionX, options.positionY, options.positionZ);

    renderer.render(scene, camera);
}

render();

window.addEventListener('mouseup', onPointerClick);
window.addEventListener('pointermove', onPointerMove);