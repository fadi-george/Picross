import * as solver from '../solver';
import { FILL_TYPE } from 'constants/grid';

const cross = FILL_TYPE.CROSS;
const fill = FILL_TYPE.FILL;

describe('Solver Helper Methods', () => {
  it('should return possibilities with no fixed inputs', () => {
    const fixeeBlocks = Array(5).fill(null);
    const res = solver.getBlockPossibilities([3], 5, fixeeBlocks);
    expect(res).toEqual([
      [fill, fill, fill, cross, cross],
      [cross, fill, fill, fill, cross],
      [cross, cross, fill, fill, fill],
    ]);
  });

  it('should return possibilities', () => {
    const res = solver.getBlockPossibilities([3], 5, [
      FILL_TYPE.FILL,
      null,
      FILL_TYPE.FILL,
      null,
      null,
    ]);

    expect(res).toEqual([[fill, fill, fill, cross, cross]]);
  });
});
