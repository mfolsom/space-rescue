import * as BABYLON from '@babylonjs/core';

const createStarfield = (scene: BABYLON.Scene) => {
    // const starfield = new BABYLON.Layer("starfield", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADNJREFUOE9jZKAQMFKon2HUAAYah8H/////g2KJkZERZ2DjjQWKDSAmjYymA1qnA2JiAQB3SAgRq6BZyAAAAABJRU5ErkJggg==", scene, true);
    const starfield = new BABYLON.ParticleSystem('starfield', 10000, scene);
    // We want to emit the particles on the surface of a sphere 10000 in radius
    starfield.createSphereEmitter(10000, 0);

    // We want to emit all of the particles at once, to immediately fill the scene
    starfield.manualEmitCount = 10000;

    // We want the stars to live forever
    starfield.minLifeTime = Number.MAX_VALUE;
    starfield.maxLifeTime = Number.MAX_VALUE;

    // We want the stars to vary in size
    starfield.minSize = 0.1 * 1000;
    starfield.maxSize = 0.25 * 1000;

    // We don't want the stars to move
    starfield.minEmitPower = 1;
    starfield.maxEmitPower = 0;
    starfield.gravity = new BABYLON.Vector3(0, 0, -0.1);

    // Star colours will pick from somewhere between these two colours
    starfield.color1 = new BABYLON.Color4(1, 0.8, 0.8, 1.0);
    starfield.color2 = new BABYLON.Color4(1, 1, 1, 1.0);

    starfield.particleTexture = new BABYLON.Texture('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADNJREFUOE9jZKAQMFKon2HUAAYah8H/////g2KJkZERZ2DjjQWKDSAmjYymA1qnA2JiAQB3SAgRq6BZyAAAAABJRU5ErkJggg==', scene);
    starfield.start();

}
const createLights = (scene: BABYLON.Scene) => {
    const light = new BABYLON.HemisphericLight("ambient light", new BABYLON.Vector3(0, 0, 0), scene);
    light.intensity = 0.25;
    const directionalLight = new BABYLON.DirectionalLight("directional light", new BABYLON.Vector3(1, -1, -1), scene);
    directionalLight.intensity = 1;
};

export { createLights, createStarfield };
