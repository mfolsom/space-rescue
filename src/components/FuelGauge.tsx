import React from 'react';
import FuelIcon from './../assets/fuel.png';

interface GaugeProps {
    radius: number;
    percent?: number;
}

const FuelGauge: React.FC<GaugeProps> = ({ radius, percent = 0 }) => {
    const strokeWidth = radius * 0.2;
    const innerRadius = radius - strokeWidth / 2;
    const circumference = innerRadius * 2 * Math.PI;
    const arc = circumference * (270 / 360);
    const dashArray = `${arc} ${circumference}`;
    const transform = `rotate(135, ${radius}, ${radius})`;
    const percentNormalized = Math.min(Math.max(percent, 0), 100);
    const offset = arc - (percentNormalized / 100) * arc;

    return (
        <div style={{ position: 'absolute', bottom: 0, left: '60%', transform: 'translateX(-50%)', color: 'white' }}>
            <svg height={radius * 2} width={radius * 2}>
                <circle
                    className="gauge_base" // Note: Use className instead of class in React
                    cx={radius}
                    cy={radius}
                    fill="transparent"
                    r={innerRadius}
                    stroke="gray"
                    strokeWidth={strokeWidth}
                    strokeDasharray={dashArray}
                    transform={transform}
                />
                <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="15%" stopColor="#1267ff" stopOpacity="1"></stop>
                        <stop offset="85%" stopColor="#98c0ff" stopOpacity="1"></stop>
                    </linearGradient>
                </defs>

                ‍
                <circle
                    className="gauge_percent"
                    cx={radius}
                    cy={radius}
                    fill="transparent"
                    r={innerRadius}
                    stroke="url(#grad)"
                    strokeDasharray={dashArray}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    strokeWidth={strokeWidth}
                    style={{
                        transition: "stroke-dashoffset 0.3s",
                    }}
                    transform={transform}
                />
                {/* Additional SVG elements for gauge here */}
            </svg>
            <img src={FuelIcon} alt="icon" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '64px', // Set the size of your icon
                height: '64px'
            }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', color: 'white' }}>
                <p>Fuel: {percentNormalized}%</p>
            </div>
        </div>

    );
};

export default FuelGauge;