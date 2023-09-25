/* The purpose of the test here is to detect whether the correct result is generated
   under the legal input, not to test its robustness, because this is not considered
   in the implementation process of the algorithm.
*/

/* eslint-disable no-undef */

import prim from './prim';

// Simple stub for the chunker
const chunker = {
  add: () => {},
};

// What is verified here is the array of
// the previous point of each point(start from 0) in the search process,
// not the previous point in the final path.
describe('prim', () => {
  it('search from an empty array', () => {
    const E = [];
    const C = [];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([]);
  });
  it('search from an array with only one vertice', () => {
    const E = [
      [0]];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([0]);
  });
  it('search from an array with only two vertices and one edge', () => {
    const E = [
      [0, 2],
      [2, 0]];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([0, 0]);
  });
  it('Search from an array which forms a closed loop', () => {
    const E = [
      [0, 1, 4, 0],
      [1, 0, 0, 2],
      [4, 0, 0, 3],
      [0, 2, 3, 0]];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([0, 0, 3, 1]);
  });
  it('Search from an array with duplicate path lengths', () => {
    const E = [
      [0, 2, 6, 0, 0],
      [2, 0, 6, 5, 7],
      [6, 6, 0, 1, 4],
      [0, 5, 1, 0, 3],
      [0, 7, 4, 3, 0]];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([0, 0, 3, 1, 3]);
  });
  it('Search from an array that forms a line with decreasing path lengths ', () => {
    const E = [
      [0, 4, 0, 0, 0],
      [4, 0, 3, 0, 0],
      [0, 3, 0, 2, 0],
      [0, 0, 2, 0, 1],
      [0, 0, 0, 1, 0]];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([0, 0, 1, 2, 3]);
  });
});

describe('primNew', () => {
  it('search from an empty array', () => {
    const E = [];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([]);
  });
  it('search from an array with only one vertice', () => {
    const E = [
      [0]];
    const C = [
      [0, 0]];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([0]);
  });
  it('search from an array with only two vertices and one edge', () => {
    const E = [
      [0, 2],
      [2, 0]];
    const C = [
      [0, 0],
      [0, 2]];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([0, 0]);
  });
  it('Search from an array which forms a closed loop', () => {
    const E = [
      [0, 10, 17, 0],
      [10, 0, 0, 6],
      [17, 0, 0, 15],
      [0, 6, 15, 0]];
    const C = [
      [8, 0],
      [0, 6],
      [0, -15],
      [0, 0]];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([0, 0, 3, 1]);
  });
  it('Search from an array with duplicate path lengths', () => {
    const E = [
      [0, 8, 6, 0, 0],
      [8, 0, 10, 16, 17],
      [6, 10, 0, 10, 21],
      [0, 16, 10, 0, 17],
      [0, 17, 21, 17, 0]];
    const C = [
      [0, 0],
      [8, 0],
      [0, 6],
      [-8, 0],
      [0, -15]];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([0, 0, 0, 2, 1]);
  });
  it('Search from an array that forms a line with decreasing path lengths ', () => {
    const E = [
      [0, 4, 0, 0, 0],
      [4, 0, 3, 0, 0],
      [0, 3, 0, 2, 0],
      [0, 0, 2, 0, 1],
      [0, 0, 0, 1, 0]];
    const C = [
      [0, 0],
      [4, 0],
      [4, 3],
      [2, 3],
      [2, 2]];
    expect(prim.run(chunker, { matrix: E, coordsMatrix: C })).toEqual([0, 0, 1, 2, 3]);
  });
});
