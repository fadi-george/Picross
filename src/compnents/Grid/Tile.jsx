import React from 'react';

// components
import Button from '@material-ui/core/Button';

const styles = {
  tile: {
    border: '1px solid black',
    borderRadius: 0,
    minHeight: 0,
    minWidth: 0,
    padding: '0 0 100% 0',
  },
};

const Tile = ({ onTitleChange, value }) => {
  return (
    <Button fullWidth style={styles.tile} onClick={onTitleChange}>
      {value || ''}
    </Button>
  );
};

export default Tile;
