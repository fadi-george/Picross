export const generateGrid = ({ rows = 5, columns = 5 } = {}) => {
  const playerGrid = Array(rows)
    .fill()
    .map(() => new Array(columns).fill().map(() => null));

  const solutionGrid = Array(rows)
    .fill()
    .map(() =>
      new Array(columns)
        .fill()
        .map(() => (Math.round(Math.random()) ? '#000000' : '')),
    );

  return {
    playerGrid,
    solutionGrid,
    ...getGridBoundaries(solutionGrid),
  };
};

export const getGridBoundaries = (grid) => {
  const colBounds = [];
  const rowBounds = [];
  const rowLength = grid.length;
  const columnLength = grid[0].length;

  // counting streaks across rows
  for (let row = 0; row < rowLength; row++) {
    let rowStreak = 0;

    rowBounds[row] = [];
    for (let col = 0; col < columnLength; col++) {
      const currColtItem = grid[row][col];
      const prevColItem = grid[row][col - 1];

      // only counting streaks of non "empty" values
      if (currColtItem === '') {
        if (prevColItem !== '' && col !== 0) {
          rowBounds[row].push(rowStreak);
          rowStreak = 0;
        }
      } else {
        rowStreak++;
        if (col === columnLength - 1) {
          rowBounds[row].push(rowStreak);
        }
      }
    }
    if (rowBounds[row].length === 0) {
      rowBounds[row].push(0);
    }
  }

  // counting streaks across columns
  for (let col = 0; col < columnLength; col++) {
    let colStreak = 0;

    colBounds[col] = [];
    for (let row = 0; row < rowLength; row++) {
      const currRowItem = grid[row][col];
      const prevRowItem = grid[row - 1] ? grid[row - 1][col] : undefined;

      // only counting streaks of non "empty" values
      if (currRowItem === '') {
        if (prevRowItem !== '' && row !== 0) {
          colBounds[col].push(colStreak);
          colStreak = 0;
        }
      } else {
        colStreak++;
        if (row === rowLength - 1) {
          colBounds[col].push(colStreak);
        }
      }
    }
    if (colBounds[col].length === 0) {
      colBounds[col].push(0);
    }
  }

  return {
    colBounds,
    rowBounds,
  };
}
