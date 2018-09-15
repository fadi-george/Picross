// @flow
import React, { Component } from 'react';
import './App.css';

// components
import styled from 'styled-components';

// type
import { FILL_TYPE } from './constants/grid';

// MUI Components
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';

// other components
import PicrossGrid from './compnents/Grid';
import PicrossControls from './compnents/Controls';
import { generateGrid } from './helpers/generate';

const Wrapper = styled.div`
  margin: 86px auto 0 auto;
  max-width: 600px;
`;

class App extends Component {
  state = {
    fillType: FILL_TYPE.FILL,
    autoCheck: false,
    autoFill: false,
    solutionGrid: [],
    playerGrid: [],
    columnBounds: [],
    rowBounds: [],
  };

  componentDidMount() {
    this.setState({ ...generateGrid() }, () => {
      console.table(this.state.solutionGrid);
    });
  }

  // update tile mark
  handleTileChange = ({ rowIndex, colIndex, value }) => {
    const updatedGrid = this.state.playerGrid
      .slice()
      .map((row, currRowIndex) => {
        return row.map((_, currColIndex) => {
          if (currRowIndex === rowIndex && currColIndex === colIndex) {
            if (value) {
              return null;
            }
            return this.state.fillType;
          }
          return row[currColIndex];
        });
      });

    this.setState({
      playerGrid: updatedGrid,
    });
  };

  render() {
    return (
      <div>
        <AppBar position="absolute">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Picross
            </Typography>
          </Toolbar>
        </AppBar>
        <PicrossControls />
        <Wrapper>
          <PicrossGrid
            fillType={this.state.fillType}
            onTileChange={this.handleTileChange}
            solutionGrid={this.state.solutionGrid}
            playerGrid={this.state.playerGrid}
            columnBounds={this.state.columnBounds}
            rowBounds={this.state.rowBounds}
          />
        </Wrapper>
      </div>
    );
  }
}

export default App;
