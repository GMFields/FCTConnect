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
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import FolderIcon from "@material-ui/icons/Folder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import clsx from "clsx";
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: "1rem"
  },
  menuButton: {
    marginRight: "1rem"
  },
  drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#3D5A80",
    },
    drawerIcon: {
      marginRight: theme.spacing(1),
      color: "#ffffff"
    },
    drawerText: {
      color: "#ffffff", 
    },
    content: {
      flexGrow: 1,
      marginLeft: drawerWidth,
      padding: theme.spacing(3),
      //backgroundColor: "#EDF5E1", // Verde claro
      color: "#1D3557" // Verde escuro
    }
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
          {/*<Typography variant="h6">oi</Typography>*/}
          <IconButton edge="end" color="inherit" aria-label="logout">
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
          Profile
          </Typography>
        </IconButton>
        <IconButton>
          <NotificationsIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
          Notifications
          </Typography>
        </IconButton>
        <IconButton>
          <SearchIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
          Search
          </Typography>
        </IconButton>
        <IconButton>
          <SettingsIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
          Settings
          </Typography>
        </IconButton>
        <IconButton>
          <FolderIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
          Files
          </Typography>
        </IconButton>
        </div>
      </Drawer>
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                {/*<MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
      fluid />*/}
                <p className="text-muted mb-1">{profileData.profile}</p>
                <p className="text-muted mb-4">{profileData.address}</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Landline</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.landline}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.phoneNumber}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                {/* Add more fields here */}
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Username</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Password</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{password}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Role</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.role}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    <button onClick={() => props.onFormSwitch('edit') }>Editar</button>
    </div>
  );

}

export default Page;

