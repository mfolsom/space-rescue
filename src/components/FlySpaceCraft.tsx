import React, { useEffect, useRef, useState } from "react";
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { createLights, createStarfield } from "./utils/spaceCraft";
import GaugesModal from "./GaugesModal";

let velocity = 0;


const initializeBabylon = (canvas: HTMLCanvasElement, targetMesh: BABYLON.Mesh | null) => {
    console.log("Initializing Babylon...")
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
    const camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), scene);
    scene.activeCamera = camera;

    // The goal distance of camera from target
    camera.radius = 30;

    // The goal height of camera above local origin (centre) of target
    camera.heightOffset = 10;

    // The goal rotation of camera around local origin (centre) of target in x y plane
    camera.rotationOffset = 0;

    // Acceleration of camera in moving from current to goal position
    camera.cameraAcceleration = 0.05;

    // The speed at which acceleration is halted 
    camera.maxCameraSpeed = 20;

    // This attaches the camera to the canvas
    scene.activeCamera.attachControl(canvas, true);

    // The target of the camera, what it's looking at
    camera.lockedTarget = targetMesh;
    camera.inertia = 0.5;


    return { engine, scene, camera };
};


const loadMeshes = (
    scene: BABYLON.Scene,
    spaceCraftMesh: React.MutableRefObject<BABYLON.Mesh | null>,
    onSpaceCraftMove: (coordinates: { x: number, y: number, z: number }) => void
) => {
    console.log("Loading meshes...")
    return new Promise<void>((resolve) => {
        BABYLON.SceneLoader.ImportMesh("", "assets/", "Spaceship_BarbaraTheBee.gltf", scene, function (meshes) {
            spaceCraftMesh.current = meshes[1] as BABYLON.Mesh;
            meshes.forEach(mesh => {
                mesh.position.y = 5; // Example: Adjusting the position
                mesh.position.x = -1; // Example: Adjusting the position
                mesh.position.z = 10; // Example: Adjusting the position
                mesh.rotation.y = Math.PI; // Example: Adjusting the rotation
                mesh.rotation.x = Math.PI / 2; // Example: Adjusting the rotation
                // mesh.scaling.scaleInPlace(0.01); // Example: Adjusting the scale

            });

            // Create an action manager if it doesn't exist
            if (!scene.actionManager) {
                scene.actionManager = new BABYLON.ActionManager(scene);
            }

            // Register a new action for the "w" key press
            scene.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    {
                        trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                        parameter: 'w'
                    },
                    function () {
                        if (spaceCraftMesh.current) {
                            // Move the spacecraft mesh forward when the "w" key is pressed
                            // spaceCraftMesh.current.position.z += 1;
                            velocity += 1;
                            onSpaceCraftMove({
                                x: spaceCraftMesh.current.position.x,
                                y: spaceCraftMesh.current.position.y,
                                z: spaceCraftMesh.current.position.z
                            });
                            console.log(`Y Position: ${spaceCraftMesh.current.position.y}`);
                            console.log(`X Position: ${spaceCraftMesh.current.position.x}`);
                            console.log(`Z Position: ${spaceCraftMesh.current.position.z}`);
                        }
                    }
                )
            );
            resolve(); // Resolve the Promise when the mesh is loaded
        });
    });
};

const startRenderLoop = (engine: BABYLON.Engine, scene: BABYLON.Scene, spaceCraftMesh: React.MutableRefObject<BABYLON.Mesh | null>) => {
    console.log("Starting render loop...")
    engine.runRenderLoop(() => {
        if (spaceCraftMesh.current) {
            spaceCraftMesh.current.position.z += velocity;
            velocity *= 0.99; // Adjust this value to control the deceleration of the spacecraft
        }
        scene.render();
    });
};

const FlySpaceCraft: React.FC<{
    isGaugesModalVisible: boolean,
    onSpaceCraftMove: (coordinates: { x: number, y: number, z: number }) => void
}> = ({ isGaugesModalVisible, onSpaceCraftMove }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const spaceCraftMesh: React.MutableRefObject<BABYLON.Mesh | null> = useRef(null);
    const isInitialized = useRef(false);


    useEffect(() => {
        const loadAndStart = async () => {
            console.log("GAUGES visible in FLYSPACECRAFT?" + isGaugesModalVisible)

            if (canvasRef.current && !isInitialized.current) {
                isInitialized.current = true;

                const { engine, scene, camera } = initializeBabylon(canvasRef.current, spaceCraftMesh.current);

                createLights(scene);
                createStarfield(scene);
                await loadMeshes(scene, spaceCraftMesh, onSpaceCraftMove); // Wait for the mesh to load
                camera.lockedTarget = spaceCraftMesh.current; // Set the camera to follow the mesh
                startRenderLoop(engine, scene, spaceCraftMesh);

                return () => {
                    engine.dispose();
                    scene.dispose();
                    console.log("Engine and scene disposed")
                };
            }
        };

        loadAndStart();
    }, []);

    return (
        <div className="canvas-container">
            {isGaugesModalVisible && <GaugesModal isVisible={isGaugesModalVisible} />}
            <canvas ref={canvasRef} />
        </div>
    );
};

export default FlySpaceCraft;