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
import MapIcon from "@material-ui/icons/Map";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ReportProblem from '@material-ui/icons/ReportProblem';
import HomeIcon from "@material-ui/icons/Home";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gridGap: "1rem",
  },
  markerList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
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

  const [showMarkerDialog, setShowMarkerDialog] = useState(false);
  const [markerName, setMarkerName] = useState("");
  const [markers, setMarkers] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showMarkers, setShowMarkers] = useState(false);
  const [username, setUsername] = useState('');



  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setDrawerOpen(open);
    setDrawerMini(!open);
  };

  const handleLogout = () => {

    fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/users/logout?tokenObj=${token}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
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

  useEffect(() => {
    const token = Cookies.get('token');

    try {
      const tokenData = JSON.parse(token);
      const decodedUsername = tokenData.username || '';
      setUsername(decodedUsername);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  }, []);

 
  const handleShowMarkers = () => {

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

  const handleDelete = (wayPointID) => {
    fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/waypoint/delete/${wayPointID}?tokenObj=${token}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Marcador apagado com sucesso.");
          handleShowMarkers();
        } else {
          throw new Error("Erro na exclusão do marcador.");
        }
      })
      .catch((error) => {
        console.error("Erro ao apagar o marcador:", error);
      });
  };
  
  
  const handleSaveMarker = (e) => {
    e.preventDefault();
    const newMarker = {
      "latitude": markerPosition.lat,
      "longitude": markerPosition.lng,
      "name" : markerName || 'sem nome'
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
        setShowMarkerDialog(false);
      })
      .catch((error) => {
        // Lógica para lidar com erros na solicitação
        console.error("Erro ao adicionar marcador:", error);
      });
  };

  
    const handleMapClick = (event) => {
      setShowMarkerDialog(true);
    
      const clickedPosition = {
        lat: parseFloat(event.latLng.lat()),
        lng: parseFloat(event.latLng.lng())
      };
    
      setMarkerPosition(clickedPosition);
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
       
        <IconButton className={classes.smallButton} onClick={() => props.onFormSwitch('map')}> 
          <MapIcon className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
          Mapa
          </Typography>
        </IconButton>
        <IconButton className={classes.smallButton}  onClick={() => props.onFormSwitch('anomalyBO')}>
          <ReportProblem className={clsx(classes.drawerIcon, classes.drawerText)} />
          <Typography variant="body1" className={classes.drawerText}>
          Anomalias
          </Typography>
        </IconButton>
      
        </div>
      </Drawer>
      <button onClick={handleShowMarkers}>Mostrar Marcadores</button>
<div className={classes.mapContainer}>
  <div className={classes.map}>
    {isLoaded && (
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={position}
        zoom={15}
        onClick={handleMapClick}
      >
        {showMarkers &&
          markers.map((marker, index) => (
            <Marker
              key={marker.wayPointID}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              label={index.toString()}
            />
          ))}
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    )}
  </div>
  {showMarkers && (
    <ul className={classes.markerList}>
      {markers.map((marker, index) => (
        <li key={marker.wayPointID}>
          <strong>Índice:</strong> {index}, <strong>Nome:</strong> {marker.name},{" "}
          <DeleteIcon onClick={() => handleDelete(marker.wayPointID)} />
        </li>
      ))}
      <button onClick={() => setShowMarkers(false)}>Ocultar marcadores</button>
    </ul>
  )}
</div>
{showMarkerDialog && (
  <div className="marker-dialog">
    <h3>Novo Marcador</h3>
    <input
      type="text"
      value={markerName}
      onChange={(e) => setMarkerName(e.target.value)}
      placeholder="Nome do marcador"
    />
    <button onClick={handleSaveMarker}>Guardar</button>
    <button onClick={() => setShowMarkerDialog(false)}>Cancelar</button>
  </div>
)}
 </div>
)}


export default Map;