// @flow
import React, { Component } from 'react';
import './App.css';

// components
import styled from 'styled-components';

// type
import { FILL_TYPE, CURSOR, RESET } from './constants/grid';

// MUI Components
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid';

// other components
import PicrossGrid from './compnents/Grid';
import PicrossControls from './compnents/Controls';
import { generateGrid } from './helpers/generate';

const Wrapper = styled.div`
  padding-top: 86px;
  margin: 0 auto 0 auto;
  max-width: 720px;
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
    cursorOn: false,
    position: {
      row: 0,
      col: 0,
    },
  };

  componentDidMount() {
    this.setState({ ...generateGrid() }, () => {
      console.table(this.state.solutionGrid);
    });
  }

  // grid methods
  resetGrid = () => {
    this.setState({ ...generateGrid() }, () => {
      console.table(this.state.solutionGrid);
    });
  };

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

  handlePositionChange = ({ rowOffset, colOffset }) => {
    const rowLength = this.state.playerGrid.length;
    const colLength = this.state.playerGrid[0].length;

    this.setState((prevState) => ({
      position: {
        row: (prevState.position.row + rowOffset + rowLength) % rowLength,
        col: (prevState.position.col + colOffset + colLength) % colLength,
      },
    }));
  };

  /// toolbar methods
  handleToolClick = (key) => {
    switch (key) {
      case RESET: {
        this.resetGrid();
        break;
      }
      case CURSOR:
        this.setState((prevState) => ({
          cursorOn: !prevState.cursorOn,
        }));
        break;

      case FILL_TYPE.FILL:
        this.setState({
          fillType: FILL_TYPE.FILL,
        });
        break;

      case FILL_TYPE.CROSS:
        this.setState({
          fillType: FILL_TYPE.CROSS,
        });
        break;

      default:
        break;
    }
  };

  render() {
    const cursorOn = this.state.cursorOn;

    return (
      <div className="page">
        <AppBar position="absolute">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Picross
            </Typography>
          </Toolbar>
        </AppBar>
        <Wrapper>
          <Grid container spacing={24}>
            <Grid item xs>
              <PicrossGrid
                cursorOn={cursorOn}
                fillType={this.state.fillType}
                onTileChange={this.handleTileChange}
                solutionGrid={this.state.solutionGrid}
                playerGrid={this.state.playerGrid}
                columnBounds={this.state.columnBounds}
                rowBounds={this.state.rowBounds}
                onPositionChange={this.handlePositionChange}
                position={this.state.position}
              />
            </Grid>
            <Grid item>
              <PicrossControls
                onToolClick={this.handleToolClick}
                cursorOn={cursorOn}
                fillType={this.state.fillType}
              />
            </Grid>
          </Grid>
        </Wrapper>
      </div>
    );
  }
}

export default App;
