import * as THREE from 'three'
import Experience from './Experience.js'
export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
    }
    
    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth/window.innerHeight,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 50;
        this.perspectiveCamera.position.y = 50;
        this.perspectiveCamera.position.x = 0;
        this.perspectiveCamera.rotation.z = 50 * Math.sin( 90 );
    }

    resize() {
        //Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
    }

    update() {

    }
}