import React, { useState }  from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import Map from './pages/Map';
import Page from './pages/Page';
import Users from './pages/Users';

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
        return <Users onFormSwitch={toggleForm}/>;
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
