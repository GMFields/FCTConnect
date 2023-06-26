import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

import { parseDate } from "./util";
import Cookies from "js-cookie";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "1.5rem",
    backgroundColor: "#fef6e4",
    color: "#f582ae"
  },
  media: {
    height: 300,
    minWidth: "100%"
  },
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
    backgroundColor: theme.palette.primary.main, 
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
    padding: theme.spacing(3)
  }
}));

const Home = (props) => {
  const rssFeed = "https://www.fct.unl.pt/noticias/rss.xml";
  const token = Cookies.get('token');
  const classes = useStyles();
  const MAX_ARTICLES = 10;

  const [articles, setArticles] = useState([]);
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
    const loadArticles = async () => {
      try {
        const res = await fetch(rssFeed);
        const data = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");

        const newArticles = [];

        for (let i = 0; i < items.length; i++) {
          const title = items[i].getElementsByTagName("title")[0].textContent;
          const link = items[i].getElementsByTagName("link")[0].textContent;
          const pubDate = items[i].getElementsByTagName("pubDate")[0].textContent;
          const thumbnail = items[i].getElementsByTagName("description")[0].textContent.match(/<img.*?src="(.*?)"/)?.[1];

          newArticles.push({ title, link, pubDate, thumbnail });
        }

        setArticles(newArticles.slice(0, MAX_ARTICLES));
      } catch (error) {
        console.log(error);
      }
    };

    loadArticles();
  }, []);

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
          <Typography variant="h6">Latest Posts</Typography>
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
      <main className={classes.content}>
        <Container maxWidth="lg">
        <Typography variant="h5" component="h2" className={classes.recentPosts}>
            Recent Posts
          </Typography>
          <Grid container spacing={3}>
            {articles.length > 0 ? (
              articles.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.link}>
                  <a
                    className="link"
                    href={item.link}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    title={item.title}
                    aria-label={item.link}
                  >
                    <Card className={classes.root}>
                      <CardActionArea>
                        {item.thumbnail && (
                          <CardMedia
                            className={classes.media}
                            image={item.thumbnail}
                            title={item.title}
                          />
                        )}
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {parseDate(item.pubDate)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </a>
                </Grid>
              ))
            ) : (
              <p>No articles to show</p>
            )}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Home;