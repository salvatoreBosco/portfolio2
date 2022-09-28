// import * as THREE from 'three';
// import Experience from './Exxperience/Experience.js'
// const experience = new Experience(document.querySelector(".webgl"))



import './style.css'
import * as THREE from 'three'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
import Camera from './Exxperience/Camera.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0;
camera.position.x = 5;
camera.position.y = 20;
camera.rotateY(90)
console.log(camera.rotation.y)

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, -40);
controls.update();


scene.add(new THREE.AmbientLight(0xffffff, 20));

const light1 = new THREE.PointLight(0xFF00D5, 20, 100);
light1.castShadow = true;
light1.shadow.mapSize.width = 4096;
light1.shadow.mapSize.height = 4096;
scene.add(light1);

const light2 = new THREE.PointLight(0xFF00D5, 20, 100);
light2.castShadow = true;
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;
scene.add(light2);

const loader = new FontLoader();

loader.load('../static/Assets/fonts/gentilis_regular.typeface.json', function(font){
  const geometry = new TextGeometry('Ciao Salvo!', {
    font: font,
    size: 6,
    height: 2,
  })
  const textMesh = new THREE.Mesh(geometry, [
    new THREE.MeshPhongMaterial({color: 0xad4000}),
    new THREE.MeshPhongMaterial({color: 0x5c2301})
  ])

  textMesh.castShadow = true;
  textMesh.position.y +=15;
  textMesh.position.z -= 40;
  textMesh.position.x = -8
  textMesh.rotation.y = -0.50;
  scene.add(textMesh)
})

let loader2  = new GLTFLoader();
loader2.load('../static/Assets/myportfolio2.gltf', function(gltf){
  scene.add(gltf.scene);
})


function animate(){
  // const now = Date.now() / 1000;
  // light1.position.y = 15;
  // light1.position.x = Math.cos(now) * 20;
  // light1.position.z = Math.sin(now) * 20;

  // light2.position.y = 25;
  // light2.position.x = Math.cos(now) * 20;
  // light2.position.z = Math.sin(now) * 20;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();




