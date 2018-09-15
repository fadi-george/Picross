import React from 'react';

// constants
import { FILL_TYPE } from '../../constants/grid';

// icons
import CloseIcon from '@material-ui/icons/Close';

// components
import Button from '@material-ui/core/Button';

// styles
import styled from 'styled-components';

const ColorBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  position: absolute;
  top: 0px;
`;
const IconWrapper = styled.div`
  background-color: ${(props) => props.backgroundColor || 'none'};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const styles = {
  tile: {
    border: '1px solid black',
    borderRadius: 0,
    minHeight: 0,
    minWidth: 0,
    padding: '0 0 100% 0',
  },
};

const TileFill = ({ value, solution }) => {
  switch (value) {
    case FILL_TYPE.FILL: {
      if (solution) {
        return <ColorBlock color={solution} />;
      }
      return (
        <IconWrapper backgroundColor="#fde4e4">
          <CloseIcon style={{ color: 'red', fontSize: 48 }} />
        </IconWrapper>
      );
    }
    case FILL_TYPE.CROSS: {
      return <IconWrapper>X</IconWrapper>;
    }
    case FILL_TYPE.MEMO: {
      return <IconWrapper>T</IconWrapper>;
    }
    default:
      return null;
  }
};

const Tile = ({ onTitleChange, value, rowIndex, colIndex, solution }) => {
  return (
    <Button
      fullWidth
      style={styles.tile}
      onClick={() => {
        onTitleChange({ rowIndex, colIndex, value });
      }}
    >
      <TileFill value={value} solution={solution} />
    </Button>
  );
};

export default Tile;
