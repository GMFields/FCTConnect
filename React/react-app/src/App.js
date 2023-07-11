import React, { useState }  from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import Map from './pages/Map';
import Page from './pages/Page';
import LoginBO from './pages/LoginBO';
import HomeBO from './pages/HomeBO';
import Anomaly from './pages/AnomalyBO';
import ChangePassword from './pages/ChangePassword';
import MapBO from './pages/MapBO';
import ProfileBO from './pages/profileBO';
import AnomalyBO from './pages/AnomalyBO';



const App = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'login':
        return <Login onFormSwitch={toggleForm} />;
      case 'loginBO':
        return <LoginBO onFormSwitch={toggleForm} />;
      case 'register':
        return <Register onFormSwitch={toggleForm} />;
      case 'home':
        return <Home onFormSwitch={toggleForm} />;
      case 'homeBO':
        return <HomeBO onFormSwitch={toggleForm} />;
      case 'profile':
        return <Page onFormSwitch={toggleForm}/>;
      case 'profileBO':
        return <ProfileBO onFormSwitch={toggleForm}/>;
      case 'edit':
        return <EditProfile onFormSwitch={toggleForm}/>;
      case 'map':
        return <Map onFormSwitch={toggleForm}/>;
      case 'mapBO':
        return <MapBO onFormSwitch={toggleForm}/>;
      case 'anomaly':
          return <Anomaly onFormSwitch={toggleForm}/>;
      case 'anomalyBO':
          return <AnomalyBO onFormSwitch={toggleForm}/>;
      case 'changePassword':
        return <ChangePassword OnFormSwitch={toggleForm}/>;
      default:
        return null;
    }
  };
  return(
    <div className='App'>
      {renderForm()}
    </div>
  );
};

export default App;
