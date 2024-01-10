import React, { useState, useEffect, useRef } from 'react';
import { KeyboardEventTypes, PointerEventTypes, PointerInfo, Scene } from '@babylonjs/core';


type TutorialStep = {
    description: string;
    condition: (scene: Scene) => Promise<boolean>;
};

const tutorialSteps: TutorialStep[] = [
    {
        description: 'Hold down the left mouse button and drag to the right or left to rotate around the spacecraft.',
        condition: (scene: Scene) => {
            // Create a promise that resolves when the user drags the mouse to the right
            return new Promise((resolve) => {
                let lastPointerX: number;
                let isDragging = false;

                scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
                    switch (pointerInfo.type) {
                        case PointerEventTypes.POINTERDOWN:
                            isDragging = true;
                            lastPointerX = pointerInfo.event.clientX;
                            break;
                        case PointerEventTypes.POINTERMOVE:
                            if (isDragging && pointerInfo.event.clientX > lastPointerX) {
                                resolve(true);
                            }
                            lastPointerX = pointerInfo.event.clientX;
                            break;
                        case PointerEventTypes.POINTERUP:
                            isDragging = false;
                            break;
                    }
                });
            });
        },
    },
    {
        description: 'Open the flight data dashboard by clicking the "Flight Data" button.',
        condition: (_scene: Scene) => {
            return new Promise((resolve) => {
                // Get the button that opens the flight data modal
                const flightDataModalButton = document.querySelector('.flight-data-button');

                // If the button exists, add a click event listener to it
                if (flightDataModalButton) {
                    const onClick = () => {
                        resolve(true);
                        // Remove the event listener after the step is completed
                        flightDataModalButton.removeEventListener('click', onClick);
                    };

                    flightDataModalButton.addEventListener('click', onClick);
                }
            });
        },
    },


    {
        description: 'View your Onboard Flight Instruments by clicking the "Flight Instruments" button.',
        condition: (_scene: Scene) => {
            return new Promise((resolve) => {
                // Create a MutationObserver to watch for changes in the DOM
                const observer = new MutationObserver((mutationsList, observer) => {
                    // Check if the GaugesModal is visible
                    const gaugesModalVisible = document.querySelector('.modal');

                    // If the GaugesModal is visible, resolve the promise with true and disconnect the observer
                    if (gaugesModalVisible) {
                        resolve(true);
                        observer.disconnect();
                    }
                });

                // Start observing the document with the configured parameters
                observer.observe(document, { childList: true, subtree: true });
            });
        },
    },

    {
        description: 'Press the left mouse button and the "W" key on the keyboard at the same time to fly the spacecraft.',
        condition: (scene: Scene) => {
            return new Promise((resolve) => {
                let isMouseDown = false;
                let isWKeyPressed = false;

                scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
                    if (pointerInfo.type === PointerEventTypes.POINTERDOWN && pointerInfo.event.button === 0) {
                        isMouseDown = true;
                        console.log('isMouseDown', isMouseDown);
                    }
                });

                scene.onKeyboardObservable.add((kbInfo) => {
                    if (kbInfo.type === KeyboardEventTypes.KEYDOWN && (kbInfo.event.key === 'w' || kbInfo.event.key === 'W')) {
                        isWKeyPressed = true;
                        console.log('isWKeyPressed', isWKeyPressed);
                    }

                    if (isMouseDown && isWKeyPressed) {
                        resolve(true);
                        console.log('W key pressed while mouse button is down');
                    }
                });
            });
        },
    },

    // Add more steps here...
];

type TutorialProps = {
    scene: Scene;
};

const Tutorial: React.FC<TutorialProps> = ({ scene }) => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep < tutorialSteps.length) {
            tutorialSteps[currentStep].condition(scene).then((conditionMet) => {
                console.log('conditionMet', conditionMet);
                if (conditionMet) {
                    setCurrentStep(currentStep + 1);
                }
            });
        }
    }, [currentStep, scene]);

    if (currentStep >= tutorialSteps.length) {
        return null;
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'Green',
            fontSize: '30px',
            position: 'absolute',
            top: '10px',
            left: '0',
            right: '0'
        }}>
            {currentStep < tutorialSteps.length && tutorialSteps[currentStep].description}
        </div>
    );
};

export default Tutorial;