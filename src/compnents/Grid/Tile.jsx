import React from 'react';

// constants
import { FILL_TYPE } from '../../constants/grid';
import yellow from '@material-ui/core/colors/yellow';

// icons
import CloseIcon from '@material-ui/icons/Close';

// components
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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
  wrapper(highlightRow, highlightCol) {
    let backgroundColor = 'white';
    if (highlightCol && highlightRow) {
      backgroundColor = yellow[300];
    } else if (highlightCol || highlightRow) {
      backgroundColor = yellow[100];
    }

    return {
      zIndex: highlightRow && highlightCol ? 2 : 1,
      backgroundColor,
    };
  },
  tile(isSelected) {
    return {
      border: '1px solid black',
      borderRadius: 0,
      minHeight: 0,
      minWidth: 0,
      padding: '0 0 100% 0',
      boxSizing: 'content-box',
    };
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
      return (
        <IconWrapper>
          <CloseIcon style={{ color: 'black', height: '80%', width: '80%' }} />
        </IconWrapper>
      );
    }
    case FILL_TYPE.MEMO: {
      return <IconWrapper>T</IconWrapper>;
    }
    default:
      return null;
  }
};

const Tile = ({
  onTitleChange,
  value,
  rowIndex,
  colIndex,
  solution,
  highlightRow,
  highlightCol,
}) => {
  return (
    <Paper
      elevation={highlightRow && highlightCol ? 10 : 0}
      style={styles.wrapper(highlightRow, highlightCol)}
    >
      <Button
        fullWidth
        style={styles.tile(highlightRow, highlightCol)}
        onClick={() => {
          onTitleChange({ rowIndex, colIndex, value });
        }}
      >
        <TileFill value={value} solution={solution} />
      </Button>
    </Paper>
  );
};

export default Tile;
