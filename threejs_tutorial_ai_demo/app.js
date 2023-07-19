import * as THREE from 'three';
import * as dat from 'dat.gui';
import * as YUKA from 'yuka';

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

const vehicleGeometry = new THREE.ConeGeometry(0.1, 0.5, 8);
vehicleGeometry.rotateX(Math.PI/2);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const vehicleMesh = new THREE.Mesh(vehicleGeometry, material); 
vehicleMesh.matrixAutoUpdate = false;
scene.add(vehicleMesh);

const vehicle = new YUKA.Vehicle();
vehicle.setRenderComponent(vehicleMesh, sync);

function sync(entity, renderComponent) {
    renderComponent.matrix.copy(entity.worldMatrix);
}

const path = new YUKA.Path();
path.add(new YUKA.Vector3(-4, 0, 4));
path.add(new YUKA.Vector3(-6, 0, 0));
path.add(new YUKA.Vector3(-4, 0, -4));
path.add(new YUKA.Vector3(0, 0, 0));
path.add(new YUKA.Vector3(4, 0, -4));
path.add(new YUKA.Vector3(6, 0, 0));
path.add(new YUKA.Vector3(4, 0, 4));
path.add(new YUKA.Vector3(0, 0, 6));

vehicle.position.copy(path.current());

const followPathBehavior = new YUKA.FollowPathBehavior(path, 0.5);
vehicle.steering.add(followPathBehavior);

const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);

const time = new YUKA.Time();

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

    const delta = time.update().getDelta();
    entityManager.update(delta);
    renderer.render(scene, camera);
}

render();
// renderer.setAnimationLoop(render);
