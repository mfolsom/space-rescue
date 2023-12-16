import React, { useState, useEffect } from 'react';
import FlySpaceCraft from './components/FlySpaceCraft';
import Gauge from './components/Gauge';
import FuelGauge from './components/FuelGauge';
import OxygenGauge from './components/OxygenGauge';
import Dashboard from './components/DashBoard';


const App: React.FC = () => {


  return (
    <div className="App">
      <FlySpaceCraft />
      <Gauge radius={100} percent={25} />
      <FuelGauge radius={100} percent={10} />
      <OxygenGauge radius={100} percent={80} />
      <Dashboard />
    </div>
  );
}

export default App;

