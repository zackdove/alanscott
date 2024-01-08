// import * as THREE from 'three';
import { PCDLoader } from "./PCDLoader.js";
import { OrbitControls } from "./OrbitControls.js";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2);

console.log("test");

document
  .getElementById("projects-threejs-container")
  .appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.visible = true;
scene.add(cube);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(7, 4, 7);
controls.update();
controls.enableDamping = true;

const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(50, 50, 50);
scene.add(light);

const hemLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemLight);

window.scene = scene;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Sophie's stuff below

const projects = window.projects;
console.log(projects);

for (let i = 0; i < projects.length; i++) {
  console.log(projects[i].title);
  //   const t = new Text(projects[i].title);
  //   scene.add(t);
}
