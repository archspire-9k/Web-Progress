import * as THREE from 'three';

export class SpriteFlipbook {
    tileX = 0;
    tileY = 0;
    currentTile = 0;

    map;
    maxDisplayTime = 0;
    elapsedTime = 0;
    runningTileArrayIndex = 0;

    playSpriteIndices = [];
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
        this.sprite.position.y = 1;
        this.sprite.scale.set(2, 2, 2);
        scene.add(this.sprite);

    }

    loop(playSpriteIndices, totalDuration) {
        this.playSpriteIndices = playSpriteIndices;
        this.runningTileArrayIndex = 0;
        this.currentTile = playSpriteIndices[this.runningTileArrayIndex];
        this.maxDisplayTime = totalDuration / this.playSpriteIndices.length;
        this.elapsedTime = this.maxDisplayTime; // force to play new animation
    }

    update(delta) {
        this.elapsedTime += delta;

        if (this.maxDisplayTime > 0 && this.elapsedTime >= this.maxDisplayTime) {
            this.elapsedTime = 0;
            this.runningTileArrayIndex = (this.runningTileArrayIndex + 1) % this.playSpriteIndices.length;
            this.currentTile = this.playSpriteIndices[this.runningTileArrayIndex];

            const offsetX = (this.currentTile % this.tileX) / this.tileX;
            const offsetY = (this.tileY - Math.floor(this.currentTile / this.tileY) - 1) / this.tileY;

            this.map.offset.x = offsetX;
            this.map.offset.y = offsetY;
        }
    }
}