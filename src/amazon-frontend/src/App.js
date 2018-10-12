import React from 'react';
import Home from './Home';
import Books from './Books';
import Publishers from './Publishers';
import Authors from './Authors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import BookIcon from '@material-ui/icons/Book';
import AuthorIcon from '@material-ui/icons/AccountBox';
import PublisherIcon from '@material-ui/icons/Copyright';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import './App.css';

const paperStyle = {
    height: '85%',
    width: "85%",
    margin: '7%',
    textAlign: 'center',
    display: 'inline-block',
};

class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            "open": false,
            "show": null
        };
  }

  toggleDrawer = () =>
  {
    this.setState({open: !this.state.open});
  }

  showPage = (page) =>
  {
    // Close the Left Drawer
    this.setState({open: false, page: page});
  }

  render() {
    let content = null;

    switch(this.state.page) {
      case "books":
        content = (<Books/>);
        break;
      case "authors":
        content = (<Authors/>);
        break;
      case "publishers":
        content = (<Publishers/>);
        break;
      default:
        content = (<Home/>);
    }
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Amazon 1.0
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <AppBar title="AppBar"/>
            <MenuItem id="showHome" onClick={() => this.showPage('home')}>
              <ListItemIcon>
                <HomeIcon />
                <ListItemText inset primary="Home" />
              </ListItemIcon>
            </MenuItem>
            <Divider />
            <MenuItem id="showBooks" onClick={() => this.showPage('books')}>
              <ListItemIcon>
                <BookIcon />
                <ListItemText inset primary="Books" />
              </ListItemIcon>
            </MenuItem>
             <MenuItem id="showAuthors" onClick={() => this.showPage('authors')}>
              <ListItemIcon>
                <AuthorIcon />
                <ListItemText inset primary="Authors" />
              </ListItemIcon>
            </MenuItem>
             <MenuItem id="showPublishers" onClick={() => this.showPage('publishers')}>
              <ListItemIcon>
                <PublisherIcon />
                <ListItemText inset primary="Publishers" />
              </ListItemIcon>
            </MenuItem>
        </Drawer>
        <Paper style={paperStyle} >
          {content}
        </Paper>
      </div>
    );
  }
}

export default App;
