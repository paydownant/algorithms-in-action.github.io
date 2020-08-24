/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-loop-func */
/* eslint-disable react/button-has-type */
/* eslint-disable dot-notation */
/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { GlobalActions } from '../context/actions';
// eslint-disable-next-line import/named
import '../styles/LineNumHighLight.css';
import findRef from '../pseudocode/findRef';

let codeBlocks = {};


function addIndentation(json, name) {
  const codeBlock = {};
  let pseaudo = '';
  json[name].forEach((line) => {
    if (line['ref'].length > 0) {
      pseaudo = '\xa0\xa0\xa0\xa0'.repeat(line['indentation']) + line['code'];
      codeBlock[pseaudo] = line['bookmark'];
      addIndentation(json, line['ref'], line['indentation']);
    } else {
      pseaudo = '\xa0\xa0\xa0\xa0'.repeat(line['indentation']) + line['code'];
      codeBlock[pseaudo] = line['bookmark'];
    }
  });
  codeBlocks[name] = codeBlock;
}


let i = 0;

const addCollapse = (algorithm1, dispatch1, codeBlocks1, currentBookmark, blockName) => {
  let codeLines = [];
  for (const [key, value] of Object.entries(codeBlocks1[blockName])) {
    const ref = findRef(value);
    if (ref.length > 0) {
      codeLines.push(
        <p
          key={i}
          // eslint-disable-next-line react/destructuring-assignment
          className={currentBookmark.step === value ? 'active' : ''}
          index={i}
          role="presentation"
        >
          <span>{i + 1}</span>
          <span>
            <button onClick={() => { dispatch1(GlobalActions.COLLAPSE, ref); }}>
              {algorithm1.collapse[ref] ? '-' : '+'}
            </button>
          </span>
          <span>{key}</span>
        </p>,
      );
      i += 1;
      if (algorithm1.collapse[ref]) {
        const temp = addCollapse(algorithm1, dispatch1, codeBlocks1, currentBookmark, ref);
        codeLines = codeLines.concat(temp);
      }
    } else {
      codeLines.push(
        <p
          key={i}
          // eslint-disable-next-line react/destructuring-assignment
          className={currentBookmark.step === value ? 'active' : ''}
          index={i}
          role="presentation"
        >
          <span>{i + 1}</span>
          <span>{key}</span>
        </p>,
      );
      i += 1;
    }
  }
  return codeLines;
};

const LineNumHighLight = () => {
  const { algorithm, dispatch } = useContext(GlobalContext);
  codeBlocks = {};
  i = 0;
  addIndentation(algorithm.pseudocode, 'Main');

  /* render data */

  return (
    <div className="line-light">
      <div className="code-container">
        {addCollapse(algorithm, dispatch, codeBlocks, algorithm.bookmark, 'Main')}
      </div>
    </div>
  );
};

export default LineNumHighLight;
