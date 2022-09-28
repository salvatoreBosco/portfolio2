import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
        this.setOrbitControls()
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
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.controls.enableDamping = true;
        this.controls.enableZoom = true
    }

    resize() {
        //Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}