// @flow
import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';

// type
import { FILL_TYPE } from './constants/grid';

// components
import PicrossGrid from './compnents/Grid';
import PicrossControls from './compnents/Controls';

const styles = {
  grid: {
    margin: '0 auto',
    maxWidth: '600px',
  },
};

class App extends Component {
  state = {
    fillType: FILL_TYPE.FILL,
    autoCheck: false,
    autoFill: false,
  };

  render() {
    return (
      <Grid container direction="column" style={styles.grid}>
        <h1>Picross</h1>
        <PicrossGrid fillType={this.state.fillType} />
        <PicrossControls />
      </Grid>
    );
  }
}

export default App;
