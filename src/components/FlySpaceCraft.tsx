import React, { useEffect, useRef, useState } from "react";
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { createLights, createStarfield } from "./utils/spaceCraft";
import createMars from "./utils/marsUtils";
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
    onSpaceCraftMove: (coordinates: { x: number, y: number, z: number }) => void,
    setIsKeyPressed: React.Dispatch<React.SetStateAction<boolean>>,
    fuelRef: React.MutableRefObject<number>,

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
                        setIsKeyPressed(true);
                        if (spaceCraftMesh.current && fuelRef.current > 0) {
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

            // Register a new action for the "s" key press
            scene.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    {
                        trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                        parameter: 's'
                    },
                    function () {
                        setIsKeyPressed(true);
                        if (spaceCraftMesh.current && fuelRef.current > 0) {
                            velocity -= 1;
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

            // Register a new action for the key up event
            scene.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    {
                        trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                    },
                    function () {
                        setIsKeyPressed(false); // Set isKeyPressed to false when any key is released
                    }
                )
            );
            resolve(); // Resolve the Promise when the mesh is loaded
        });
    });
};

const startRenderLoop = (engine: BABYLON.Engine, scene: BABYLON.Scene, spaceCraftMesh: React.MutableRefObject<BABYLON.Mesh | null>, setFuel: React.Dispatch<React.SetStateAction<number>>) => {
    console.log("Starting render loop...")
    let previousPositionZ = 0;
    engine.runRenderLoop(() => {
        if (spaceCraftMesh.current) {
            const currentPositionZ = spaceCraftMesh.current.position.z;
            spaceCraftMesh.current.position.z += velocity;
            velocity *= 0.99; // Adjust this value to control the deceleration of the spacecraft

            // Only deplete fuel if the spacecraft is moving forward
            if (currentPositionZ > previousPositionZ) {
                const distanceTraveled = currentPositionZ - previousPositionZ;
                const maxDistance = 4500;
                const fuelConsumptionRate = (distanceTraveled / maxDistance) * 100; // Calculate the percentage of the total distance traveled
                setFuel(prevFuel => Math.max(prevFuel - fuelConsumptionRate, 0)); // Deplete the fuel by the calculated percentage
            }
            previousPositionZ = currentPositionZ;
        }
        scene.render();
    });
};

const FlySpaceCraft: React.FC<{
    isGaugesModalVisible: boolean,
    onSpaceCraftMove: (coordinates: { x: number, y: number, z: number }) => void,
    fuel: number,
    setFuel: React.Dispatch<React.SetStateAction<number>>
}> = ({ isGaugesModalVisible, onSpaceCraftMove, fuel, setFuel }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const spaceCraftMesh: React.MutableRefObject<BABYLON.Mesh | null> = useRef(null);
    const isInitialized = useRef(false);
    const [isKeyPressed, setIsKeyPressed] = useState(false);
    const fuelRef = useRef(fuel);

    useEffect(() => {
        fuelRef.current = fuel;
        const loadAndStart = async () => {
            console.log("GAUGES visible in FLYSPACECRAFT?" + isGaugesModalVisible)

            if (canvasRef.current && !isInitialized.current) {
                isInitialized.current = true;

                const { engine, scene, camera } = initializeBabylon(canvasRef.current, spaceCraftMesh.current);

                createLights(scene);
                createStarfield(scene);
                createMars(scene);

                await loadMeshes(scene, spaceCraftMesh, onSpaceCraftMove, setIsKeyPressed, fuelRef); // Wait for the mesh to load
                camera.lockedTarget = spaceCraftMesh.current; // Set the camera to follow the mesh
                startRenderLoop(engine, scene, spaceCraftMesh, setFuel);

                return () => {
                    engine.dispose();
                    scene.dispose();
                    console.log("Engine and scene disposed")
                };
            }
        };

        loadAndStart();
    }, [fuel, setFuel]);

    return (
        <div className="canvas-container">
            {isGaugesModalVisible && <GaugesModal isVisible={isGaugesModalVisible} velocity={isKeyPressed ? 100 : 0} fuel={fuel} />}
            <canvas ref={canvasRef} />
        </div>
    );
};

export default FlySpaceCraft;