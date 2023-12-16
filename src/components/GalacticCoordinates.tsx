// GalacticCoordinates.tsx
import React from 'react';

interface GalacticCoordinatesProps {
    l: number;
    b: number;
}

const GalacticCoordinates: React.FC<GalacticCoordinatesProps> = ({ l, b }) => {
    return (
        <div>
            <p>Longitude: {l}°</p>
            <p>Latitude: {b}°</p>
        </div>
    );
};

export default GalacticCoordinates;
