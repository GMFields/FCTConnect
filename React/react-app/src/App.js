import React, { useState }  from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
//import ProfilePage from './pages/ProfilePage';
import Page from './pages/Page';


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
