import React from 'react';

interface CustomGaugeProps {
    radius: number;
    percent?: number;
    icon: string;
    label: string;
}

const CustomGauge: React.FC<CustomGaugeProps> = ({ radius, percent = 0, icon, label }) => {
    const strokeWidth = radius * 0.2;
    const innerRadius = radius - strokeWidth / 2;
    const circumference = innerRadius * 2 * Math.PI;
    const arc = circumference * (270 / 360); // Arc for 270 degrees
    const dashArray = `${arc} ${circumference}`;
    const transform = `rotate(135, ${radius}, ${radius})`; // Rotate to start from the bottom left
    const percentNormalized = Math.min(Math.max(percent, 0), 100); // Normalize percentage
    const offset = arc - (percentNormalized / 100) * arc; // Offset for the dash array

    return (
        <div style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
            <svg height={radius * 2} width={radius * 2}>
                <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="15%" stopColor="#1267ff" stopOpacity="1"></stop>
                        <stop offset="85%" stopColor="#98c0ff" stopOpacity="1"></stop>
                    </linearGradient>
                </defs>
                <circle
                    className="gauge_base"
                    cx={radius}
                    cy={radius}
                    fill="transparent"
                    r={innerRadius}
                    stroke="gray"
                    strokeWidth={strokeWidth}
                    strokeDasharray={dashArray}
                    transform={transform}
                    fontFamily='gil sans'
                />
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
                    style={{ transition: "stroke-dashoffset 0.3s" }}
                    transform={transform}
                />
                {/* Additional SVG elements for gauge can be added here */}
            </svg>
            <img src={icon} alt="icon" style={{
                position: 'absolute',
                top: '35%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '64px',
                height: '64px'
            }} />
            <div style={{
                position: 'absolute',
                top: '70%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Gill Sans'
            }}>
                <p style={{ fontFamily: 'Gill Sans' }}>{label}: {percentNormalized}%</p>
            </div>

        </div>
    );
};

export default CustomGauge;
