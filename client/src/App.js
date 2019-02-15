import React, { Component } from 'react';
import {Box, Button, Collapsible, Heading, Grommet, Layer, ResponsiveContext} from 'grommet';
import {FormClose, Notification} from 'grommet-icons';
import {Route} from 'react-router-dom';
import Projects from './Projects';
import ProjectDetail from "./ProjectDetail";
import axios from 'axios'
import {Link} from 'react-router-dom';
import './App.css';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const AppBar = (props) => (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
    />
  );

class App extends Component {
  state = {
    showSidebar: false,
    projects : [],
  }
  componentDidMount() {
    axios.get("http://localhost:4000/api/projects")
    .then(response => {
      console.log(response.data)
      this.setState({projects: response.data})})
    .catch(err => console.log(err))
  }
  render() {
    const { showSidebar } = this.state;
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
          <AppBar>
          <Link exact to="/"><Heading level='3' margin='none'>Projects and Actions</Heading></Link>
          <Button icon={<Notification />} onClick={() => {
            console.log(this.state)
            this.setState(prevState => ({ showSidebar: !prevState.showSidebar}))
            }} />
        </AppBar>
        <Box direction='row' flex overflow={{ horizontal: 'hidden'}}>
          <Box flex align='center' justify='center'>
            <Route exact path='/' render={(props) => <Projects projects={this.state.projects} {...props}/>}/>
            <Route path="/:id" render={(props) => <ProjectDetail {...props}/>} />

          </Box>
          {(!showSidebar || size !== 'small') ? (
              <Collapsible direction="horizontal" open={showSidebar}>
                <Box flex width="medium" background='light-2' elevation='small'
                  align='center' justify='center'>
                    <div className="nav-item">Add Project</div>
                    <div className="nav-item">Edit Project</div>
                </Box>
              </Collapsible>
              

          ): (
            <Layer>
              <Box background='light-2'
              tag='header'
              justify='end'
              align='center'
              direction='row'
              >
              <Button icon={<FormClose/>}
              onclick={() => {
                console.log("anything")
                this.setState({showSidebar:false})
                }
                }/>
              </Box>
              <Box fill background='light-2'
              align='center'
              justify='center'
              >sidebar</Box>
            </Layer>
          )}

        </Box>
        </Box>

        )}

        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;
