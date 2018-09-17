// @flow
import { FILL_TYPE } from '../constants/grid';

const getBlockPossibilities = (bounds = [], length) => {
  let result = [];
  if (bounds.length && length >= 1) {
    let count = bounds[0];
    let configArray = Array(length)
      .fill()
      .map(() => FILL_TYPE.CROSS);

    if (count === 0) {
      return configArray;
    }

    let lim =
      length - bounds.reduce((acc, curr) => acc + curr, 0) - bounds.length + 2;
    for (let i = 0; i < lim; i++) {
      let temp = [
        ...configArray.slice(0, i),
        ...Array(count).fill(FILL_TYPE.FILL),
        ...configArray.slice(i + count),
      ];

      let configurations = getBlockPossibilities(
        bounds.slice(1),
        length - count - i - 1,
      );

      if (configurations.length) {
        configurations.forEach((segmentArray) => {
          result.push([...temp.slice(0, count + i + 1), ...segmentArray]);
        });
      } else {
        result.push(temp);
      }
    }
  }
  return result;
};

const mergeBlockPossibilities = (blocks) => {
  let result = [];

  if (blocks.length) {
    const numColumns = blocks[0].length;
    const numRows = blocks.length;

    for (let col = 0; col < numColumns; col++) {
      let isCross = blocks[0][col] === FILL_TYPE.CROSS;
      let isFill = blocks[0][col] === FILL_TYPE.FILL;
      for (let row = 0; row < numRows; row++) {
        if (row !== 0) {
          if (blocks[row - 1][col] !== blocks[row][col]) {
            isCross = isFill = false;
            break;
          }
        }
      }

      if (isCross) {
        result.push(FILL_TYPE.CROSS);
      } else if (isFill) {
        result.push(FILL_TYPE.FILL);
      } else {
        result.push(null);
      }
    }
  }
  return result;
};

export const solveSingle = (
  grid: Array,
  rowBounds: Array,
  colBounds: Array,
) => {
  const updatedGrid = grid.map((row) => row.slice());
  const numrows = grid.length;
  const numCols = grid[0].length;

  // going through each row
  let possibleBlockArrays;
  let mergedBlockArray;
  for (let rowIndex = 0; rowIndex < numrows; rowIndex++) {
    // get and merged possible placement of filled/crossed blocks
    possibleBlockArrays = getBlockPossibilities(rowBounds[rowIndex], numCols);
    mergedBlockArray = mergeBlockPossibilities(possibleBlockArrays);

    // merged determined placement of blocks with existing blocks
    mergedBlockArray.forEach((value, colIndex) => {
      if (value) {
        updatedGrid[rowIndex][colIndex] = value;
      }
    });
  }

  // going through each column
  for (let colIndex = 0; colIndex < numCols; colIndex++) {
    possibleBlockArrays = getBlockPossibilities(colBounds[colIndex], numrows);
    mergedBlockArray = mergeBlockPossibilities(possibleBlockArrays);

    mergedBlockArray.forEach((value, rowIndex) => {
      if (value) {
        updatedGrid[rowIndex][colIndex] = value;
      }
    });
  }

  console.table(updatedGrid)
  return updatedGrid;
};

export const isSolved = (playerGrid: Array, solutionGrid: Array) => {
  let solved = true;
  playerGrid.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      let cellValue = solutionGrid[rowIndex][colIndex];
      if (cellValue) {
        if (value !== FILL_TYPE.FILL) {
          solved = false;
          return;
        }
      } else {
        if (value !== FILL_TYPE.CROSS) {
          solved = false;
          return;
        }
      }
    });
    if (!solved) {
      return;
    }
  });

  return solved;
};
