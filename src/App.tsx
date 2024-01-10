import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlySpaceCraft from './components/FlySpaceCraft';
import DataModal from './components/DataModal';
import NavComponent from './components/NavComponent';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';
import authService from './services/authService';
import GameIntroModal from './components/GameIntroModal';
import LandingSequenceModal from './components/LandingSequenceModal';
import WinModal from './components/WinModal';

const App: React.FC = () => {
  const [isNavComponentVisible, setIsNavComponentVisible] = useState(false); // [1
  const [isDataModalVisible, setIsDataModalVisible] = useState(false);
  const [isGaugesModalVisible, setIsGaugesModalVisible] = useState(false);
  const [spaceCraftCoordinates, setSpaceCraftCoordinates] = useState({ x: 0, y: 0, z: 0 });
  const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(true);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({ name: '', level: 0, credits: 0 });
  const [fuel, setFuel] = useState(100);
  const [isGameIntroModalVisible, setIsGameIntroModalVisible] = useState(false);
  const [isLandingSequenceModalVisible, setIsLandingSequenceModalVisible] = useState(false);
  const [isWinModalVisible, setIsWinModalVisible] = useState(false);

  const handleOpenDataModal = () => setIsDataModalVisible(true);
  const toggleGaugesModal = () => setIsGaugesModalVisible(prev => !prev);
  const handleSpaceCraftMove = (coordinates: { x: number, y: number, z: number }) => {
    setSpaceCraftCoordinates(coordinates);
  };

  const handleRegistrationSuccess = () => {
    setIsRegistrationModalVisible(false);
    setIsLoginModalVisible(true);
  };

  const handleLoginSuccess = async (userData: any) => {
    setIsLoginModalVisible(false);
    const userDetails = await authService.getUserDetails(userData.id);
    setPlayerInfo({
      name: userDetails.display_name,
      level: userData.level,
      credits: userData.credits
    });
    setIsNavComponentVisible(true);
    setIsGameIntroModalVisible(true);
  };

  const showLoginModal = () => {
    setIsRegistrationModalVisible(false);
    setIsLoginModalVisible(true);
  };

  const updateCredits = (newCredits: number) => {
    setPlayerInfo(prevState => ({
      ...prevState,
      credits: newCredits
    }));
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
                fuel={fuel}
                setFuel={setFuel}
              />
              <DataModal
                isVisible={isDataModalVisible}
                coordinates={spaceCraftCoordinates}
                playerInfo={playerInfo}
                updateCredits={updateCredits}
                setIsLandingSequenceModalVisible={setIsLandingSequenceModalVisible}
              />
              <LandingSequenceModal
                isVisible={isLandingSequenceModalVisible}
                onDismiss={() => {
                  setIsLandingSequenceModalVisible(false);
                  setIsWinModalVisible(true);
                }}
                setIsWinModalVisible={setIsWinModalVisible}
              />

              <NavComponent
                isVisible={isNavComponentVisible}
                onToggleGauges={toggleGaugesModal}
                onOpenData={handleOpenDataModal}
                playerName={playerInfo.name}
                level={playerInfo.level}
                credits={playerInfo.credits}
              />
            </div>
            {isGameIntroModalVisible && (
              <GameIntroModal />
            )}
            {isRegistrationModalVisible && (
              <RegistrationModal onRegistrationSuccess={handleRegistrationSuccess} onShowLogin={showLoginModal} />
            )}
            {isLoginModalVisible && (
              <LoginModal onLoginSuccess={handleLoginSuccess} />
            )}
            {isLandingSequenceModalVisible && (
              <LandingSequenceModal
                isVisible={isLandingSequenceModalVisible}
                onDismiss={() => {
                  setIsLandingSequenceModalVisible(false);
                  setIsWinModalVisible(true);
                }}
                setIsWinModalVisible={setIsWinModalVisible}
              />
            )}
            {isWinModalVisible && <WinModal isVisible={isWinModalVisible} />}
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
