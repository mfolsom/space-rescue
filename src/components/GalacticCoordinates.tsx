// GalacticCoordinates.tsx
import React from 'react';
import './FlySpaceCraft.tsx';

interface GalacticCoordinatesProps {
    l: number;
    b: number;
}

const GalacticCoordinates: React.FC<GalacticCoordinatesProps> = ({ l, b }) => {
    return (
        <div>
            <p>X: {spaceCraftMesh.current.position.x}°</p>
            <p>Y: {spaceCraftMesh.current.position.y}°</p>
        </div>
    );
};

export default GalacticCoordinates;
