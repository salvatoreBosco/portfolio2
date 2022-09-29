import * as THREE from "three"
import Experience from "../Experience.js";
import Opere from "./Opere.js"

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        console.log(this.actualRoom)
        const opera = new Opere( 6, 0.2, -0.99, 0, 0, 0, "Assets/opere/opera1.jpeg");
        console.log(opera)
        const opera1 = new Opere( 4, 0.2, -0.99, 0, 0, 0, "Assets/opere/opera2.jpeg");
        const opera2 = new Opere( 2, 0.2, -0.99, 0, 0, 0, "Assets/opere/opera3.jpeg");
        const opera3 = new Opere( -2, 0.2, -0.99, 0, 0, 0, "Assets/opere/opera4.jpeg");
        const opera4 = new Opere( -4, 0.2, -0.99, 0, 0, 0, "Assets/opere/opera5.jpeg");
        const opera5 = new Opere( -6, 0.2, -0.99, 0, 0, 0, "Assets/opere/opera6.jpeg");


        this.setModel();

    }

    setModel() {
        this.scene.add(this.actualRoom);
    }

    resize() {

    }

    update() {

    }
}