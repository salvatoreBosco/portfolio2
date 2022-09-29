import * as THREE from 'three'
import Experience from './Experience.js'
import { PointerLockControls } from '../../node_modules/three/examples/jsm/controls/PointerLockControls.js'

let controls
let raycaster;
const objects = [];
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 1;
        this.perspectiveCamera.position.y = 2;
        this.perspectiveCamera.position.x = -5;
        this.perspectiveCamera.rotation.y = -(Math.PI / 2);
        this.perspectiveCamera.rotation.x = Math.sin(0);
        this.perspectiveCamera.rotation.z = Math.sin(0);
    }

    setOrbitControls() {
        controls = new PointerLockControls(this.perspectiveCamera, this.canvas);

        const blocker = document.getElementById('blocker');
        const instructions = document.getElementById('instructions');

        instructions.addEventListener('click', function () {

            controls.lock();

        });

        controls.addEventListener('lock', function () {

            instructions.style.display = 'none';
            blocker.style.display = 'none';

        });

        controls.addEventListener('unlock', function () {

            blocker.style.display = 'block';
            instructions.style.display = '';

        });
        controls.getObject().position.set(-100, -2, 0);
        this.scene.add(controls.getObject());
        
        const onKeyDown = function (event) {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = true;
                    break;

                case 'Space':
                    if (canJump === true) velocity.y = 150;
                    canJump = false;
                    break;

            }

        };

        const onKeyUp = function (event) {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = false;
                    break;

            }

        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
    }

    resize() {
        //Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
    }

    update() {
        const time = performance.now();
        
        if (controls.isLocked === true) {

            raycaster.ray.origin.copy(controls.getObject().position);
            raycaster.ray.origin.y -= 10;

            const intersections = raycaster.intersectObjects(objects, false);

            const onObject = intersections.length > 0;

            const delta = (time - prevTime) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            direction.z = Number(moveForward) - Number(moveBackward);
            direction.x = Number(moveRight) - Number(moveLeft);
            direction.normalize(); // this ensures consistent movements in all directions

            if (moveForward || moveBackward) velocity.z -= direction.z * 300.0 * delta;
            if (moveLeft || moveRight) velocity.x -= direction.x * 300.0 * delta;

            if (onObject === true) {

                velocity.y = Math.max(0, velocity.y);
                canJump = true;

            }

            controls.moveRight(- velocity.x * delta);
            controls.moveForward(- velocity.z * delta);

            controls.getObject().position.y += (velocity.y * delta); // new behavior

            if (controls.getObject().position.y < 1.7) {

                velocity.y = 0;
                controls.getObject().position.y = 1.7;

                canJump = true;

            }

        }

        prevTime = time;

    }
}