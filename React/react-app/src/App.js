import React, { useState }  from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import Map from './pages/Map';
import Page from './pages/Page';
import Calendar from './pages/Calendar';
import Notification from './pages/Notification';
import Chat from './pages/Chat';

const App = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'login':
        return <Login onFormSwitch={toggleForm} />;
      case 'register':
        return <Register onFormSwitch={toggleForm} />;
      case 'home':
        return <Home onFormSwitch={toggleForm} />;
      case 'profile':
        return <Page onFormSwitch={toggleForm}/>;
      case 'edit':
        return <EditProfile onFormSwitch={toggleForm}/>;
      case 'map':
        return <Map onFormSwitch={toggleForm}/>;
      case 'calendar':
        return <Calendar onFormSwitch={toggleForm}/>;
      case 'notificacions':
        return <Notification onFormSwitch={toggleForm}/>;
      case 'chat':
        return <Chat onFormSwitch={toggleForm}/>;
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
