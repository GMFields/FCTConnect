import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';

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
import FolderIcon from "@material-ui/icons/Folder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CalendarMonthIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/Chat';

import clsx from "clsx";
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  label:{
    color: "#1D3557" ,
    fontWeight: "bold",
    alignItems: "left"
  },
  appBar: {
    marginBottom: "0.75rem",
    backgroundColor: "#3e6a8a",
  },
  menuButton: {
    marginRight: "1rem",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#3e6a8a",
  },
  drawerIcon: {
    marginRight: theme.spacing(1),
    color: "#ffffff",
    fontSize: "1.5rem"
  },
  drawerText: {
    color: "#ffffff",
    fontSize: "0.9rem"
  },
  content: {
    flexGrow: 1,
    marginLeft: drawerWidth,
    padding: theme.spacing(3),
    backgroundColor: "#EDF5E1", // Light green background
    color: "#1D3557", // Dark green text
  },
  pageHeader: {
    marginBottom: "2rem",
    color: "#1D3557",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  cardTitle: {
    color: "#1D3557",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  cardText: {
    color: "#1D3557",
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  cardImage: {
    width: "150px",
    borderRadius: "50%",

  },
  editButton: {
    backgroundColor: "#1D3557",
    color: "#EDF5E1",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
}));


const Page2 = (props) => {
  const token = Cookies.get('token');
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState({});
  const [profileData, setProfileData] = useState({});
  const password = Cookies.get('password');
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

  

  const handleFieldClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: true,
    }));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFieldBlur = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: false,
    }));
  };

  const renderField = (label, field) => {
    if (editMode[field]) {
      return (
        <input
          type="text"
          name={field}
          value={formData[field] || ''}
          onChange={handleFieldChange}
          onBlur={() => handleFieldBlur(field)}
        />
      );
    } else {
      return (
        <div
          onClick={() => handleFieldClick(field)}
          style={{ cursor: 'pointer' }}
        >
          {formData[field]}
        </div>
      );
    }
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
  useEffect(() => {
    // Fetch user profile data
    fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/users/profile?tokenObj=${token}` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Profile data result:', data);
        // Set profile data
        setProfileData(data);
        // Set form data with profile data
        setFormData(data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, [token]);

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
    <div>
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
      <IconButton edge="end" color="inherit" aria-label="logout" onClick={handleLogout} >
        <ExitToAppIcon/>
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
    <IconButton onClick={() => props.onFormSwitch('profile')}>
      <AccountCircleIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
      <Typography variant="body1" className={classes.drawerText}>
      Perfil
      </Typography>
    </IconButton>
    <IconButton>
      <NotificationsIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
      <Typography variant="body1" className={classes.drawerText}>
      Notificações
      </Typography>
    </IconButton>
    <IconButton  onClick={() => props.onFormSwitch('map')}>
      <MapIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
      <Typography variant="body1" className={classes.drawerText}>
      Mapa
      </Typography>
    </IconButton>
    <IconButton>
      <CalendarMonthIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
      <Typography variant="body1" className={classes.drawerText}>
      Calendário
      </Typography>
    </IconButton>
    <IconButton>
      <ChatIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
      <Typography variant="body1" className={classes.drawerText}>
      Chat
      </Typography>
    </IconButton>
    </div>
  </Drawer>
<section className={classes.content}>
  <MDBContainer className="py-5">
    <MDBRow>
    <MDBCol lg="8">
      <MDBCard>
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <MDBCardText>
                      <div>
                        <label className={classes.label}>Name</label>
                        {renderField("Name", "name")}
                      </div>
                      <div>
                        <label className={classes.label}>Palavra-passe</label>
                        {renderField("Password", "password")}
                      </div>
                      <div>
                        <label className={classes.label}>Email</label>
                        {renderField("Email", "email")}
                      </div>
                      <div>
                        <label className={classes.label}>Função</label>
                        {renderField("Role", "role")}
                      </div>
                      <div>
                        <label className={classes.label}>Prefil</label>
                        {renderField("Profile", "profile")}
                      </div>
                      <div>
                        <label className={classes.label}>Telefone</label>
                        {renderField("Landline", "landline")}
                      </div>
                      <div>
                        <label className={classes.label}>Telemóvel</label>
                        {renderField("PhoneNumber", "phoneNumber")}
                      </div>
                      <div>
                        <label className={classes.label}>Ocupação</label>
                        {renderField("Occupation", "occupation")}
                      </div>
                      <div>
                        <label className={classes.label}>Endereço</label>
                        {renderField("Adress", "address")}
                      </div>
                      <div>
                        <label className={classes.label}>Nif</label>
                        {renderField("Nif", "nif")}
                      </div>
                      <div>
                        <label className={classes.label}>Departamento</label>
                        {renderField("Department", "department")}
                      </div>
              </MDBCardText>
              <MDBBtn type="submit" color="primary">
                Guardar
              </MDBBtn>
            </form>
         </MDBCardBody>
      </MDBCard>
    </MDBCol>
    </MDBRow>
   </MDBContainer>
   </section>
   </div>
  );
};

export default Page2;
