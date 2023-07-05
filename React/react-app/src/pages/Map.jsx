import {GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api";
import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
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
import clsx from "clsx";


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  map:{
    height:"100vh",

  },
  smallButton : {
    width:"100%",
  },
  appBar: {
    backgroundColor: "#2596be"
  },
  menuButton: {
    marginRight: "1rem"
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#2596be"
    
  },
  drawerIcon: {
    marginRight: theme.spacing(1),
    color: "#ffffff",
    fontSize: "0rem"
  },
  drawerText: {
    color: "#ffffff", 
    fontSize: "0.9rem"
  },
  content: {
    flexGrow: 1,
    marginLeft: drawerWidth,
    padding: theme.spacing(3)
  }
}));
const Map = (props) => {
  const {isLoaded } = useJsApiLoader({
    id:"google-map-script",
    googleMapsApiKey:"AIzaSyAZELnglG_oCx4z-ITNEq0YNpmiFrctW5s",
    
  });

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
  const position = {
    lat:38.66156674841695,
    lng: -9.20545026264386
  }
  const [markerName, setMarkerName] = useState("");

  const [markers, setMarkers] = useState([]);
  const [showMarkers, setShowMarkers] = useState(false);

  const handleShowMarkers = () => {
    const token = Cookies.get('token');
    let username = '';
    
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      username = tokenData.username || '';
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
    
    console.log(username);
    // Use o nome de usuário conforme necessário
    

    fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/waypoint/list/${username}?tokenObj=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
      // Lógica para lidar com a resposta do backend
      console.log("Lista de waypoints obtida com sucesso:", data);
      // Atualizar o estado dos marcadores com os dados retornados
      setMarkers(data);

      // Exibir os marcadores
      setShowMarkers(true);
      })
      .catch((error) => {
        // Lógica para lidar com erros na solicitação
        console.error("Erro ao obter lista de waypoints:", error);
      });
  };
  

  const handleMapClick = (event) => {
    
    const markerPosition = {
      lat:parseFloat(event.latLng.lat()),
      lng:parseFloat(event.latLng.lng()) 
    }

    const newMarker = {
      "latitude": markerPosition.lat,
      "longitude": markerPosition.lng,
      "name" : markerName
    }

    fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/waypoint/add?tokenObj=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newMarker), // Enviar os dados do novo marcador
    })
      .then((response) => response.json())
      .then((data) => {
        // Lógica para lidar com a resposta do backend
        console.log("Marcador adicionado com sucesso:", data);
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      })
      .catch((error) => {
        // Lógica para lidar com erros na solicitação
        console.error("Erro ao adicionar marcador:", error);
      });
  };

    return(
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
          {/*<Typography variant="h6">Noticias</Typography>*/}
          <IconButton edge="end" color="inherit" aria-label="logout" onClick={handleLogout}>
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
        <IconButton   className={classes.smallButton} onClick={() => props.onFormSwitch('home')}> 
          <HomeIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
          Home
          </Typography>
        </IconButton>
        <IconButton   className={classes.smallButton} onClick={() => props.onFormSwitch('profile')}> 
          <AccountCircleIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
          Perfil
          </Typography>
        </IconButton>
        <IconButton className={classes.smallButton}   onClick={() => props.onFormSwitch('notificacions')}>
          <NotificationsIcon  className={clsx(classes.drawerIcon, classes.drawerText)} />
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
        <IconButton className={classes.smallButton}>
          <ChatIcon className={clsx(classes.drawerIcon, classes.drawerText)} onClick={() => props.onFormSwitch('chat')} />
          <Typography variant="body1" className={classes.drawerText}>
          Chat
          </Typography>
        </IconButton>
        </div>
      </Drawer>
        <div className={classes.map}>
          { isLoaded ? (
            <GoogleMap 
            mapContainerStyle={{width: "100%", height: "100%"}}
            center={position}
            zoom={15}
            onClick={handleMapClick}
            >
              {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.latitude, lng: marker.longitude }} label={(index + 1).toString()} />
          ))}
          <input
            type="text"
            name="markerName"
            value={markerName}
            onChange={(e) => setMarkerName(e.target.value)}
          />
          <button onClick={handleShowMarkers}>Mostrar todos os marcadores</button>
         { /*<MDBContainer className={classes.content1}>
          <button onClick={handleMapClick}> Adicionar novo marcador</button>
          <input type="text" name="name" value={newMarker.name} required></input>
          </MDBContainer>*/}
            </GoogleMap>
          ):(<></>)
          }

        </div>

        </div>

    )
}

export default Map;