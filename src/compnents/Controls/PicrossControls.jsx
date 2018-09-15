// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

// styles
const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.gridTemplateColumns};
`;

class PicrossGrid extends Component {
  state = {
    solutionGrid: [],
    playerGrid: [],
    columnBounds: [],
    rowBounds: [],
  };

  render() {
    return (
      <div>

      </div>
    );
  }
}

PicrossGrid.propTypes = {};

export default PicrossGrid;
