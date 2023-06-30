import Cookies from 'js-cookie';
import React, { useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MapIcon from "@material-ui/icons/Map";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CalendarMonthIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/Chat';
import HomeIcon from "@material-ui/icons/Home";
import {MDBBtn} from 'mdb-react-ui-kit';
import Avatar from "react-avatar-edit";

import clsx from "clsx";
const drawerWidth = 200;


const useStyles = makeStyles((theme) => ({
  background:{
    backgroundColor: " #a49fa5",
  },
  containerWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  smallButton : {
    width:"100%",
  },
  appBar: {
    marginBottom: "0.75rem",
    background: "#2596be",
    //"linear-gradient(to right, #27C1FA, #14D466)",
  },
  menuButton: {
    marginRight: "1rem"
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#2596be",//"#6ECBDF",
  },
  drawerIcon: {
    marginRight: theme.spacing(1),
    color: "#ffffff",
    fontSize: "1rem"
  },
  drawerText: {
    color: "#ffffff",
    fontSize: "0.9rem"
  },
  content: {
    flex: "0.5",
    marginLeft: "20%",
    marginRight:"20%",
    backgroundColor: "#ffffff",
    color: "#1D3557",
    height: "60%",
    display: "flex",
    justifyContent: "center",
    border: "2px solid #808080",
  },
  content2: {
    flex: "1",
    marginRight:"5%",
    backgroundColor: "#ffffff",
    color: "#1D3557",
    height: "90%",
    display: "flex",
    justifyContent: "center",
    border: "2px solid #808080",
  },
  
  pageHeader: {
    marginBottom: "2rem",
    color: "#1D3557",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  cardText: {
    color: "#1468A2",
    fontSize: "1rem",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  cardImage: {
    width: "150px",
    borderRadius: "50%",
    marginBottom:"5%"
  },
  saveButton: {
    backgroundColor: "#1468A2",
    color: "#EDF5E1",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  infoBox: {
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  input:{
   marginLeft: "5%",
   padding:"3%",
   backgroundColor: "rgba(71, 71, 71, 0.2)"
 }
}));
const EditProfile = (props) => {
  const token = Cookies.get('token');

  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMini, setDrawerMini] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setDrawerOpen(open);
    setDrawerMini(!open);
  };

  const handleLogout = () => {
    fetch("https://helical-ascent-385614.oa.r.appspot.com/rest/users/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: token,
    })
      .then(response => {
        if (response.ok) {
          // Logout successful
          console.log("Logout successful");
          props.onFormSwitch('login');
        } else {
          // Handle error response
          console.error("Logout failed:", response.statusText);
        }
      })
      .catch(error => {
        // Handle network error
        console.error("Logout failed:", error);
      });
  };

  const [formData, setFormData] = useState({});
  const[src, setSrc] = useState(null);
  const[preview, setPreview] = useState(null);
  
  
  const onCrop = (view) =>{
      setPreview(view)
  }

  const onClose = () =>{
      setPreview(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      "name": formData.name || '',
      "password": formData.password || '',
      "email": formData.email || '',
      "role": formData.role || '',
      "state": 'ATIVO',
      "profile": formData.profile || '',
      "landline": formData.landline || '',
      "phoneNumber": formData.phoneNumber || '',
      "occupation": formData.occupation || '',
      "address": formData.address || '',
      "nif": formData.nif || '',
      "department":formData.department || ''
    };

    fetch(
      `https://helical-ascent-385614.oa.r.appspot.com/rest/users/update?tokenObj=${token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => {
        if (response.ok) {
          // Data updated successfully
          console.log('Data updated!');
          Cookies.set('password', formData.password);
          // Redirect to profile page
          props.onFormSwitch('profile');
        } else {
          // Error updating data
          console.log(JSON.stringify(updatedData));
          console.error('Error updating data');
        }
      })
      .catch((error) => {
        console.log('Error making request:', error);
      });
  };

  return (
    <div className={classes.background}>
    <AppBar position="static" className={classes.appBar}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="logout" onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      className={clsx(classes.drawer, {
        [classes.drawerMini]: drawerMini,
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerMini]: drawerMini,
        }),
      }}
    >
      <div role="presentation">
      <IconButton   className={classes.smallButton} onClick={() => props.onFormSwitch('home')}> 
          <HomeIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
          Home
          </Typography>
        </IconButton>
        <IconButton  className={classes.smallButton} onClick={() => props.onFormSwitch('profile')}>
          <AccountCircleIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
            Perfil
          </Typography>
        </IconButton>
        <IconButton className={classes.smallButton}  onClick={() => props.onFormSwitch('notificacions')} >
          <NotificationsIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
            Notificações
          </Typography>
        </IconButton>
        <IconButton className={classes.smallButton} onClick={() => props.onFormSwitch('map')}>
          <MapIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
            Mapa
          </Typography>
        </IconButton>
        <IconButton className={classes.smallButton}  onClick={() => props.onFormSwitch('calendar')} >
          <CalendarMonthIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
            Calendário
          </Typography>
        </IconButton>
        <IconButton className={classes.smallButton}  onClick={() => props.onFormSwitch('chat')}>
          <ChatIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
            Chat
          </Typography>
        </IconButton>
      </div>
    </Drawer>
    
    <div className={classes.content }>
    
    
      	 
      <form onSubmit={handleSubmit}>
        <label className={classes.cardText}>Nome:</label>
        <input className={classes.input}
            type='text'
            name='name'
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        <label  className={classes.cardText}>Palavra-passe:</label>
        <input  className={classes.input}
            type='text'
            name='password'
            value={formData.password || ''}
            onChange={handleChange}
            required
          />
        <label  className={classes.cardText}>Email:</label>
        <input  className={classes.input}
            type='text'
            name='email'
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        <label className={classes.cardText}>Função:</label>
        <input className={classes.input}
            type='number'
            name='role'
            value={formData.role || ''}
            onChange={handleChange}
            required
        />
        <label className={classes.cardText}>Estado:</label>
        <input className={classes.input}
            type='text'
            name='state'
            value={formData.state || ''}
            onChange={handleChange}
            required
          />
        <label className={classes.cardText}>Profile:</label>
        <input className={classes.input}
            type='text'
            name='profile'
            value={formData.profile || ''}
            onChange={handleChange}
            required
          />
        
        <label className={classes.cardText}>Telefone:</label>
        <input className={classes.input}
            type='text'
            name='phoneNumber'
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            required
          />
        
        <label className={classes.cardText}>Ocupação:</label>
        <input className={classes.input}
            type='text'
            name='occupation'
            value={formData.occupation || ''}
            onChange={handleChange}
            required
          />
        <label className={classes.cardText}>Endereço:</label>
        <input className={classes.input}
            type='text'
            name='address'
            value={formData.address || ''}
            onChange={handleChange}
            required
          />
        <label className={classes.cardText}>Nif:</label>
        <input className={classes.input}
            type='text'
            name='nif'
            value={formData.nif || ''}
            onChange={handleChange}
            required
          />
        <label className={classes.cardText}>Departamento:</label>
        <input className={classes.input}
            type='text'
            name='department'
            value={formData.department || ''}
            onChange={handleChange}
            required
          />
        <MDBBtn className={classes.saveButton} onClick={() => props.onFormSwitch('profile')}>Guardar</MDBBtn>
      </form>
    </div>
    </div>
  );
};

export default EditProfile;
