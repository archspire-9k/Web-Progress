import * as THREE from 'three';

export class SpriteFlipbook {
    tileX = 0;
    tileY = 0;
    currentTile = 0;

    map;
    sprite;

    constructor(spriteTexture, tileX, tileY, scene) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.map = new THREE.TextureLoader().load(spriteTexture);
        this.map.magFilter = THREE.NearestFilter;
        this.map.repeat.set(1 / tileX, 1 / tileY);
        this.update(0);

        const material = new THREE.SpriteMaterial({ map: this.map, color: 0xffffff });

        this.sprite = new THREE.Sprite(material);
        this.sprite.position.y = 1.2;
        this.sprite.scale.set(2.5, 2.5, 2.5);
        scene.add(this.sprite);

    }

    update(delta) {
        const offsetX = (this.currentTile % this.tileX) / this.tileX;
        const offsetY = (this.tileY - Math.floor(this.currentTile / this.tileY) - 1) / this.tileY;

        this.map.offset.x = offsetX;
        this.map.offset.y = offsetY;
    }
}