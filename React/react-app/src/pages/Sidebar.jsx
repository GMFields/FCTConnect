import React, { useState } from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import FolderIcon from "@material-ui/icons/Folder";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

const useStyles = makeStyles((theme) => ({
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

const drawerWidth = 200;

const Sidebar = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerMini, setDrawerMini] = useState(false);

    const classes = useStyles();
  
    const toggleDrawer = (open) => (event) => {
      if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
        return;
      }
  
      setDrawerOpen(open);
      setDrawerMini(!open);
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
    </div>
  );
};

export default Sidebar;
