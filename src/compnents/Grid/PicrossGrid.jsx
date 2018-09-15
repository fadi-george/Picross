// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

// components
import Tile from './Tile';
import Grid from '@material-ui/core/Grid';

// helpers
import { generateGrid } from '../../helpers/generate';

// styles
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
`;

const TileGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.templateColumns};
  border: 1px solid black;
`;

class PicrossGrid extends Component {
  state = {
    solutionGrid: [],
    playerGrid: [],
    columnBounds: [],
    rowBounds: [],
  };

  componentDidMount() {
    this.setState({ ...generateGrid() });
  }

  getGridColumnSize = () => {
    return (this.state.playerGrid[0] || []).length;
  };

  // column bounds
  displayDirectionCounts = (type, bounds) => {
    console.log(type, bounds);
    return bounds.map((colArr, index) => {
      return (
        <Grid item key={index}>
          <Grid container direction={type} spacing={8}>
            {colArr.map((segment, segmentIndex) => {
              return (
                <Grid item key={`${index}-${segmentIndex}`}>
                  {segment}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      );
    });
  };

  // main grid
  displayGrid = () => {
    const els = [];
    this.state.playerGrid.forEach((row, rowIndex) => {
      row.forEach((item, columnIndex) => {
        els.push(
          <Tile
            key={rowIndex + '-' + columnIndex}
            onTitleChange={this.handleTileChange}
            value={row[columnIndex]}
          />,
        );
      });
    });
    return els;
  };

  // update tile mark
  handleTileChange = () => {};

  render() {
    const numColumns = this.getGridColumnSize();
    return (
      <div>
        <GridContainer>
          <div />
          <Grid container justify="space-around" alignItems="flex-end">
            {this.displayDirectionCounts('column', this.state.columnBounds)}
          </Grid>
          <Grid
            container
            justify="space-around"
            alignItems="flex-end"
            direction="column"
          >
            {this.displayDirectionCounts('row', this.state.columnBounds)}
          </Grid>
          <TileGrid templateColumns={`repeat(${numColumns}, auto)`}>
            {this.displayGrid()}
          </TileGrid>
        </GridContainer>
      </div>
    );
  }
}

PicrossGrid.propTypes = {};

export default PicrossGrid;
