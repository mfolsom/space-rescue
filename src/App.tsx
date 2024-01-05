import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlySpaceCraft from './components/FlySpaceCraft';
import DataModal from './components/DataModal';
import NavComponent from './components/NavComponent';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';

const App: React.FC = () => {
  const [isDataModalVisible, setIsDataModalVisible] = useState(true);
  const [isGaugesModalVisible, setIsGaugesModalVisible] = useState(false);
  const [spaceCraftCoordinates, setSpaceCraftCoordinates] = useState({ x: 0, y: 0, z: 0 });
  const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(true);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({ name: '', score: 0, credits: 0 });

  const handleOpenDataModal = () => setIsDataModalVisible(true);
  const toggleGaugesModal = () => setIsGaugesModalVisible(prev => !prev);
  const handleSpaceCraftMove = (coordinates: { x: number, y: number, z: number }) => {
    setSpaceCraftCoordinates(coordinates);
  };

  const handleRegistrationSuccess = () => {
    setIsRegistrationModalVisible(false);
    setIsLoginModalVisible(true);
  };

  const handleLoginSuccess = (userData: any) => {
    setIsLoginModalVisible(false);
    setPlayerInfo({
      name: userData.displayName, // Update this line based on your actual user data structure
      score: userData.score, // Update this as per your data
      credits: userData.credits // Update this as per your data
    });
  };

  const showLoginModal = () => {
    setIsRegistrationModalVisible(false);
    setIsLoginModalVisible(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
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
            {isRegistrationModalVisible && (
              <RegistrationModal onRegistrationSuccess={handleRegistrationSuccess} onShowLogin={showLoginModal} />
            )}
            {isLoginModalVisible && (
              <LoginModal onLoginSuccess={handleLoginSuccess} />
            )}
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
