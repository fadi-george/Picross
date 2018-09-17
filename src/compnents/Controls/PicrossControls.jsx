// @flow
import React, { Component } from 'react';

// icons
import ReplayIcon from '@material-ui/icons/Replay';
import GamepadIcon from '@material-ui/icons/Gamepad';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';

// components
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

// constants
import yellow from '@material-ui/core/colors/yellow';
import { FILL_TYPE, CURSOR, RESET, SOLVE } from '../../constants/grid';

const styles = {
  toolBar: {
    flexDirection: 'column',
    backgroundColor: yellow[500],
    padding: '8px',
  },
  selectedTool(isOn) {
    if (isOn) {
      return {
        color: 'black',
      };
    }
    return {};
  },
  closeIcon: {
    borderWith: '2px',
    borderStyle: 'solid',
    borderRadius: '2px',
  },
};

class PicrossControls extends Component {
  props: {
    onToolClick: Function,
    cursorOn: boolean,
    fillType: string,
  };

  render() {
    const onToolClick = this.props.onToolClick;
    const fillType = this.props.fillType;
    const toolTipProps = {
      placement: 'right',
      enterDelay: 500,
    };
    // const disable = ;

    return (
      <Paper>
        <Toolbar style={styles.toolBar}>
          {/* Reset Grid */}
          <Tooltip title="Generate New Grid" {...toolTipProps}>
            <IconButton
              onClick={() => {
                onToolClick(RESET);
              }}
            >
              <ReplayIcon />
            </IconButton>
          </Tooltip>

          {/* Direction cursor */}
          <Tooltip title="Move with ArrowKeys" {...toolTipProps}>
            <IconButton
              style={styles.selectedTool(this.props.cursorOn)}
              onClick={() => {
                onToolClick(CURSOR);
              }}
            >
              <GamepadIcon />
            </IconButton>
          </Tooltip>

          {/* Fill with color */}
          <Tooltip title="Color Fill" {...toolTipProps}>
            <IconButton
              style={styles.selectedTool(fillType === FILL_TYPE.FILL)}
              onClick={() => {
                onToolClick(FILL_TYPE.FILL);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          {/* Fill with cross */}
          <Tooltip title="Color Fill" {...toolTipProps}>
            <IconButton
              style={styles.selectedTool(fillType === FILL_TYPE.CROSS)}
              onClick={() => {
                onToolClick(FILL_TYPE.CROSS);
              }}
            >
              <CloseIcon style={styles.closeIcon} />
            </IconButton>
          </Tooltip>

          {/* Solver */}
          <Divider style={{ width: '100%', margin: '8px 0px' }} />
          <Tooltip title="Solve Puzzle" {...toolTipProps}>
            <IconButton
              onClick={() => {
                onToolClick(SOLVE);
              }}
            >
              <PlayIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Paper>
    );
  }
}

export default PicrossControls;
