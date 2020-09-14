/* eslint-disable max-len */
let isLeftDragging = false;
let isRightDragging = false;
let isBottomDragging = false;

// Resizing internal border
const ROW_INTERNAL = 0;
const COL_INTERNAL = 1;

// Resizing external (window)
const ROW_EXTERNAL = 2;
const COL_EXTERNAL = 3;

// Collapsing each internal border
const COLLAPSE_LEFT = 4;
const COLLAPSE_RIGHT = 5;
const COLLAPSE_BOTTOM = 6;

// Expanding from collapsed internal border
const EXPAND_LEFT = 7;
const EXPAND_RIGHT = 8;
const EXPAND_BOTTOM = 9;

export const setCursor = (cursor) => {
  const page = document.getElementById('page');
  page.style.cursor = cursor;
};

// This section pertains to resizing internal borders with dragbars
export const startLeftDrag = () => {
  isLeftDragging = true;
  setCursor('col-resize');
};

export const startRightDrag = () => {
  isRightDragging = true;
  setCursor('col-resize');
};

export const startBottomDrag = () => {
  isBottomDragging = true;
  setCursor('row-resize');
};

export const endDrag = () => {
  isLeftDragging = false;
  isRightDragging = false;
  isBottomDragging = false;
  setCursor('auto');
};

const addUnitToList = (list, unit) => list.map((c) => `${c.toString()}${unit}`).join(' ');
const addUnitToNum = (num, unit) => `${num.toString()}${unit}`;

const EXPAND_COL_RIGHT_SIZE = 360;
const EXPAND_COL_LEFT_SIZE = 190;
const EXPAND_ROW_BOTTOM_SIZE = 190;

const getDefn = (page, list, status) => {
  let tempList = addUnitToList(list, 'px');

  switch (status) {
    case ROW_INTERNAL:
      break;
    case COL_INTERNAL:
      break;
    case ROW_EXTERNAL:
      tempList = addUnitToList([
        addUnitToNum(list[0], 'px'),
        addUnitToNum([list[1] / (list[1] + list[3])], 'fr'),
        addUnitToNum(list[2], 'px'),
        addUnitToNum([list[3] / (list[1] + list[3])], 'fr'),
      ], '');

      break;
    case COL_EXTERNAL:
      tempList = addUnitToList([
        addUnitToNum(list[0] / (list[0] + list[2] + list[4]), 'fr'),
        addUnitToNum(list[1], 'px'),
        addUnitToNum(list[2] / (list[0] + list[2] + list[4]), 'fr'),
        addUnitToNum(list[3], 'px'),
        addUnitToNum(list[4] / (list[0] + list[2] + list[4]), 'fr'),
      ], '');
      break;
    case COLLAPSE_LEFT:
      tempList = addUnitToList([
        addUnitToNum(0, 'px'),
        addUnitToNum(list[1], 'px'),
        addUnitToNum(list[2] / (list[2] + list[4]), 'fr'),
        addUnitToNum(list[3], 'px'),
        addUnitToNum(list[4] / (list[2] + list[4]), 'fr'),
      ], '');
      break;
    case COLLAPSE_RIGHT:
      tempList = addUnitToList([
        addUnitToNum(list[0] / (list[0] + list[2]), 'fr'),
        addUnitToNum(list[1], 'px'),
        addUnitToNum(list[2] / (list[0] + list[2]), 'fr'),
        addUnitToNum(list[3], 'px'),
        addUnitToNum(0, 'px'),
      ], '');
      break;
    case COLLAPSE_BOTTOM:
      tempList = addUnitToList([
        addUnitToNum(list[0], 'px'),
        addUnitToNum(list[1] / list[1], 'fr'),
        addUnitToNum(list[2], 'px'),
        addUnitToNum(0, 'px'),
      ], '');
      break;
    case EXPAND_LEFT:
      tempList = addUnitToList([
        addUnitToNum(EXPAND_COL_LEFT_SIZE, 'px'),
        addUnitToNum(list[1], 'px'),
        addUnitToNum(list[2] / (list[2] + list[4]), 'fr'),
        addUnitToNum(list[3], 'px'),
        addUnitToNum(list[4] / (list[2] + list[4]), 'fr'),
      ], '');
      break;
    case EXPAND_RIGHT:
      tempList = addUnitToList([
        addUnitToNum(list[0] / (list[0] + list[2]), 'fr'),
        addUnitToNum(list[1], 'px'),
        addUnitToNum(list[2] / (list[0] + list[2]), 'fr'),
        addUnitToNum(list[3], 'px'),
        addUnitToNum(EXPAND_COL_RIGHT_SIZE, 'px'),
      ], '');
      break;
    case EXPAND_BOTTOM:
      tempList = addUnitToList([
        addUnitToNum(list[0], 'px'),
        addUnitToNum(list[1] / list[1], 'fr'),
        addUnitToNum(list[2], 'px'),
        addUnitToNum(EXPAND_ROW_BOTTOM_SIZE, 'px'),
      ], '');
      break;
    default:
      break;
  }

  return tempList;
};


const getColDefn = (page, event, status) => {
  const leftcol = document.getElementById('leftcol');
  const rightcol = document.getElementById('rightcol');
  const leftDragbar = document.getElementById('leftdragbar');
  const rightDragbar = document.getElementById('rightdragbar');

  const leftColWidth = isLeftDragging ? event.clientX : leftcol.clientWidth;
  const rightColWidth = isRightDragging ? page.clientWidth - event.clientX : rightcol.clientWidth;

  const cols = [
    leftColWidth,
    leftDragbar.clientWidth,
    page.clientWidth - (leftDragbar.clientWidth + rightDragbar.clientWidth) - leftColWidth - rightColWidth,
    rightDragbar.clientWidth,
    rightColWidth,
  ];

  return getDefn(page, cols, status);
};

const getRowDefn = (page, event, status) => {
  const footer = document.getElementById('footer');
  const header = document.getElementById('header');
  const bottomDragbar = document.getElementById('bottomdragbar');
  const bottomRowHeight = isBottomDragging ? page.clientHeight - event.clientY : footer.clientHeight;

  const rows = [
    header.clientHeight,
    page.clientHeight - bottomDragbar.clientHeight - bottomRowHeight - header.clientHeight,
    bottomDragbar.clientHeight,
    bottomRowHeight,
  ];

  return getDefn(page, rows, status);
};

export const onDrag = (event) => {
  if (isLeftDragging || isRightDragging || isBottomDragging) {
    const page = document.getElementById('page');
    const newColDefn = getColDefn(page, event, COL_INTERNAL);
    const newRowDefn = getRowDefn(page, event, ROW_INTERNAL);
    page.style.gridTemplateRows = newRowDefn;
    page.style.gridTemplateColumns = newColDefn;

    console.log(`COL DEF: ${newColDefn}`);
    console.log(`ROW DEF: ${newRowDefn}`);

    event.preventDefault();
  }
};

const MIN_COL_THRESHOLD = 100;
const MIN_ROW_THRESHOLD = 125;
// This section pertains to collapsing the dragbars
export const collapseLeftDrag = () => {
  const page = document.getElementById('page');
  const leftcol = document.getElementById('leftcol');
  let col;

  if (leftcol.clientWidth < MIN_COL_THRESHOLD) {
    console.log('EXPAND LEFT');
    col = getColDefn(page, null, EXPAND_LEFT);
  } else {
    console.log('COLLAPSE LEFT');
    col = getColDefn(page, null, COLLAPSE_LEFT);
  }
  page.style.gridTemplateColumns = col;
};

export const collapseRightDrag = () => {
  const page = document.getElementById('page');
  const rightcol = document.getElementById('rightcol');

  let col;

  if (rightcol.clientWidth < MIN_COL_THRESHOLD) {
    console.log('EXPAND RIGHT');
    col = getColDefn(page, null, EXPAND_RIGHT);
  } else {
    console.log('COLLAPSE RIGHT');
    col = getColDefn(page, null, COLLAPSE_RIGHT);
  }

  page.style.gridTemplateColumns = col;
};

export const collapseBottomDrag = () => {
  const page = document.getElementById('page');
  const footer = document.getElementById('footer');

  let row;

  if (footer.clientHeight < MIN_ROW_THRESHOLD) {
    console.log('EXPAND FOOTER');
    row = getRowDefn(page, null, EXPAND_BOTTOM);
  } else {
    console.log('COLLAPSE FOOTER');
    row = getRowDefn(page, null, COLLAPSE_BOTTOM);
  }

  page.style.gridTemplateRows = row;
};

// This section pertains to resizing the window
export const resizeWindow = () => {
  const page = document.getElementById('page');
  const col = getColDefn(page, null, COL_EXTERNAL);
  const row = getRowDefn(page, null, ROW_EXTERNAL);
  page.style.gridTemplateColumns = col;
  page.style.gridTemplateRows = row;
};


export const addEvent = (obj, evt, fn) => {
  if (obj.addEventListener) {
    obj.addEventListener(evt, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent(`on${evt}`, fn);
  }
};
