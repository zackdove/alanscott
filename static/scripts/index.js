// import * as THREE from 'three';
import { PCDLoader } from './PCDLoader.js';
import { OrbitControls } from './OrbitControls.js';


const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(2)

document.getElementById('three-section').appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.visible = false;
scene.add( cube );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 7, 4, 7 );
controls.update();
controls.enableDamping = true;



const light = new THREE.PointLight( 0xffffff, 100, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

const hemLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( hemLight );

// instantiate a loader
const loader = new PCDLoader();

var points50k;
// load a resource
loader.load(
	// resource URL
	'threejs/models/colored-pointcloud-50k.pcd',
	// called when the resource is loaded
	function ( points ) {
		points.material.size =0;
		scene.add( points );
        points.position.set(0,0,1)
        points.rotation.set(-0.35,0, 0);
		points50k = points;
		gsap.to(points.material, {
			size: 0.5,
			duration: 5,
		})

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

// load a resource
loader.load(
	// resource URL
	'threejs/models/colored-pointcloud-500k.pcd',
	// called when the resource is loaded
	function ( points ) {
		points.material.size = 0;
		scene.add( points );
        points.position.set(0,0,1)
        points.rotation.set(-0.35,0, 0);
        // points.material.size = 0.05;
		gsap.to(points.material, {
			size: 0.05,
			duration: 5,
		})
		if (points50k){
			
			gsap.to(points50k.material, {
				size: 0.0,
				duration: 5,
				onComplete: () => {
					points50k.removeFromParent()
				}
			})
		}
	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

window.scene = scene;


function animate() {
	requestAnimationFrame( animate );
    controls.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();