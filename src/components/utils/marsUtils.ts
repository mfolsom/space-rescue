import * as BABYLON from '@babylonjs/core';

const createMars = (scene: BABYLON.Scene) => {
    // Create Mars sphere
    const mars = BABYLON.MeshBuilder.CreateSphere("mars", { diameter: 250 }, scene);
    mars.position = new BABYLON.Vector3(0, 0, 5000); // Set Mars position

    //add a rotation to the mesh
    mars.rotation.x = 0.5;

    //rotate mars on its axis
    scene.registerBeforeRender(() => {
        mars.rotate(BABYLON.Axis.Y, 0.0005, BABYLON.Space.WORLD);
    });
    //set texture
    const marsMaterial = new BABYLON.StandardMaterial("marsMaterial", scene);
    marsMaterial.diffuseTexture = new BABYLON.Texture("assets/mars.png", scene);
    mars.material = marsMaterial;
    //make mars emissive
    marsMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    //create animated atomosphere on mars
    const atmosphere = BABYLON.MeshBuilder.CreateSphere("atmosphere", { diameter: 258 }, scene);
    atmosphere.position = new BABYLON.Vector3(0, 0, 5000); // Set Mars position
    //set texture
    const atmosphereMaterial = new BABYLON.StandardMaterial("atmosphereMaterial", scene);
    atmosphereMaterial.diffuseTexture = new BABYLON.Texture("assets/atmosphere.jpg", scene);
    atmosphere.material = atmosphereMaterial;
    //make atmosphere emissive
    atmosphereMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    //make atmosphere transparent
    atmosphereMaterial.alpha = 0.4;
    //make atmosphere glow
    atmosphereMaterial.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    atmosphereMaterial.emissiveFresnelParameters.bias = 0.7;
    atmosphereMaterial.emissiveFresnelParameters.power = 20;
    atmosphereMaterial.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
    atmosphereMaterial.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();
    //animate atmosphere
    scene.registerBeforeRender(() => {
        atmosphere.rotate(BABYLON.Axis.Y, 0.001, BABYLON.Space.WORLD);
    });
};

export default createMars;