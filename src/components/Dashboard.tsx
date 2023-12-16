
import React, { useEffect, useState } from 'react';
import GalacticCoordinates from './GalacticCoordinates';

const Dashboard: React.FC = () => {
    const [galacticCoordinates, setGalacticCoordinates] = useState({ l: 0, b: 0 });
    useEffect(() => {
        const interval = setInterval(() => {
            setGalacticCoordinates({
                l: Math.random() * 360,
                b: Math.random() * 360,
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div style={{
            position: 'absolute',
            top: 250,
            left: 250,
            background: 'linear-gradient(135deg, #1f4158 0%, #27363f 100%)', // Gradient background
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)', // Adding shadow for depth
            border: '1px solid #2f455c', // Stylish border
            borderRadius: '10px', // Rounded corners
            width: '450px', // Adjust width as needed
            height: '600px', // Adjust height as needed
            color: 'white',
            overflow: 'hidden', // Ensures content fits in the rounded corners

        }}>
            <GalacticCoordinates l={galacticCoordinates.l} b={galacticCoordinates.b} />
        </div>
    );
};

export default Dashboard;

