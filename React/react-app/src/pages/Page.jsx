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
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CalendarMonthIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/Chat';

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
    background: "linear-gradient(to right, #27C1FA, #14D466)",
  },
  menuButton: {
    marginRight: "1rem"
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
    background: "linear-gradient(to right, #27C1FA, #14D466)",
  },
  drawerIcon: {
    marginRight: theme.spacing(1),
    color: "#000000",
    fontSize: "1rem"
  },
  drawerText: {
    color: "#000000",
    fontSize: "0.9rem"
  },
  content1: {
    flex: "0.5",
    marginTop: "7%",
    marginLeft: drawerWidth,
    marginRight:"5%",
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
  cardTitle: {
    color: "#1468A2",
    fontSize: "1rem",
    marginBottom: "0.25rem",
    fontWeight: "bold",
  },
  cardText: {
    color: "#1D3557",
    fontSize: "1rem",
  },
  cardImage: {
    width: "150px",
    borderRadius: "50%",
    marginBottom:"5%"
  },
  editButton: {
    backgroundColor: "#1468A2",
    color: "#EDF5E1",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  infoBox: {
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
}));

const Page = (props) => {
  const token = Cookies.get('token');
  const password = Cookies.get('password');

  const [formData, setFormData] = useState({});
  const [profileData, setProfileData] = useState({});
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

  useEffect(() => {
    // Fetch user profile data
    fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/users/profile?tokenObj=${token}`, {
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

  const renderInfoBox = (title, value) => {
    if (value && value !== "") {
      return (
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText className={classes.cardTitle}>{title}</MDBCardText>
          </MDBCol>
          <MDBCol sm="9">
            <MDBCardText className={classes.cardText}>{value}</MDBCardText>
          </MDBCol>
        </MDBRow>
      );
    } else {
      return null;
    }
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
        <IconButton className={classes.smallButton} onClick={() => props.onFormSwitch('home')}> 
          <HomeIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
          Home
          </Typography>
        </IconButton >
          <IconButton className={classes.smallButton} onClick={() => props.onFormSwitch('profile')}>
            <AccountCircleIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
            <Typography variant="body1" className={classes.drawerText}>
              Perfil
            </Typography>
          </IconButton>
          <IconButton className={classes.smallButton}  onClick={() => props.onFormSwitch('notificacions')}>
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
          <IconButton className={classes.smallButton}  onClick={() => props.onFormSwitch('calendar')}>
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
      <div className={classes.containerWrapper}>
        <MDBContainer className={classes.content1}>
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className={clsx(classes.cardImage, "rounded-circle")}
                    style={{ width: "100px", height: "100px" }}
                    fluid
                  />
                <MDBCol lg="8">
                <MDBCard className="mb-4">
                <MDBCardBody>
                  {renderInfoBox("Nome", profileData.name)}
                  {renderInfoBox("Username", profileData.username)}
                </MDBCardBody>
                </MDBCard>
                </MDBCol>
                </MDBCardBody>
              </MDBCard>
              </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBContainer  className={classes.content2}>
          <MDBRow>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  {renderInfoBox("Email", profileData.email)}
                  {renderInfoBox("Telefone", profileData.landline)}
                  {renderInfoBox("Telemóvel", profileData.phoneNumber)}
                  {renderInfoBox("Endereço", profileData.address)}
                  {renderInfoBox("Password", password)}
                  {renderInfoBox("Função", profileData.role)}
                  {renderInfoBox("Departamento", profileData.department)}
                  {renderInfoBox("Estado", profileData.state)}
                  <MDBBtn className={classes.editButton} onClick={() => props.onFormSwitch('edit')}>Editar</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div/>
    </div>
    </div>
  );
};

export default Page;
