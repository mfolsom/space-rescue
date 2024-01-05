import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlySpaceCraft from './components/FlySpaceCraft';
import DataModal from './components/DataModal';
import NavComponent from './components/NavComponent';
import Registration from './components/Registration';
import Login from './components/Login';

const App: React.FC = () => {
  const [isDataModalVisible, setIsDataModalVisible] = useState(true);
  const [isGaugesModalVisible, setIsGaugesModalVisible] = useState(false);
  const [spaceCraftCoordinates, setSpaceCraftCoordinates] = useState({ x: 0, y: 0, z: 0 });

  const handleOpenDataModal = () => setIsDataModalVisible(true);
  const toggleGaugesModal = () => setIsGaugesModalVisible(prev => !prev);

  const handleSpaceCraftMove = (coordinates: { x: number, y: number, z: number }) => {
    setSpaceCraftCoordinates(coordinates);
  };

  const playerInfo = {
    name: 'Megan',
    score: 100,
    credits: 500
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <div className="App">
            <FlySpaceCraft
              isGaugesModalVisible={isGaugesModalVisible}
              onSpaceCraftMove={handleSpaceCraftMove}
            />
            <DataModal isVisible={isDataModalVisible} coordinates={spaceCraftCoordinates} />
            <NavComponent
              onToggleGauges={toggleGaugesModal}
              onOpenData={handleOpenDataModal}
              playerName={playerInfo.name}
              score={playerInfo.score}
              credits={playerInfo.credits}
            />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;


