import React from 'react';
import './styles/App.scss';
import Header from './components/Header';
import { GlobalProvider } from './context/GlobalState';
import RightPanel from './components/RightPanel/RightPanel';
import LeftPanel from './components/LeftPanel/LeftPanel';
import MidPanel from './components/MidPanel/MidPanel';

function App() {
  return (
    <GlobalProvider>
      <div className="container">
        <Header />
        <div className="panel">
          <div className="leftPanel">
            <LeftPanel />
          </div>
          <div className="midPanel">
            <MidPanel />
          </div>
          <div className="rightPanel">
            <RightPanel />
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
