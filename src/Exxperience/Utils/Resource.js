import * as THREE from "three"
import EventEmitter from "../../../node_modules/events/events.js"
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import Experience from "../Experience";

export default class Resources extends EventEmitter{
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;
        
        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loader = {};
        this.loader.gltfloader = new GLTFLoader();
    }
    startLoading(){
        for(const asset of this.assets){
            if(asset.type==="glbModel"){
                this.loader.gltfloader.load(asset.path, (file)=>{
                    console.log(file)
                    this.singleAssetLoaded(asset, file);
                })
                console.log(this.loader.gltfloader)

            }
        }
    }

    singleAssetLoaded(asset, file){
        this.items[asset.name] = file;
        this.loaded++;

        if(this.loaded === this.queue){

            this.emit("ready");
        }
    }
}
