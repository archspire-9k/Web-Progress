import * as THREE from 'three';

export class SpriteFlipbook {
    private tileX = 0;
    private tileY = 0;
    private currentTile = 0;

    private map;
    private sprite;

    constructor(spriteTexture, tileX, tileY, scene) {
        this.map = new THREE.TextureLoader().load(spriteTexture);
        this.map.magFilter = THREE.NearestFilter;
        this.map.repeat.set(1 / tileX, 1 / tileY);
        
        this.update(0);

        const material = new THREE.SpriteMaterial({ map: map });

        this.sprite = new THREE.Sprite(material);
        this.sprite.position.y = 1.2;
        this.sprite.scale.set(2.5, 2.5, 2.5);
        scene.add(this.sprite);

    }

    public update(delta) {
        const offsetX = (this.currentTile % this.tileX) / this.tileX;
        const offsetY = (this.tileY - Math.floor(this.currentTile / this.tileY) - 1) / this.tileY;

        this.map.offset.x = offsetX;
        this.map.offset.y = offsetY;
    }
}