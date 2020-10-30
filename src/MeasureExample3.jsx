import React, { forwardRef } from 'react';
import useDimensions from 'react-cool-dimensions';
import { ResizeObserver } from '@juggle/resize-observer';
import { clone, each, throttle } from 'lodash-es';

import './MeasureExample3.scss';

const OTHER_DIV_WIDTH = 300;
const BUTTON_MAX_WIDTH = 110;

const Button = forwardRef((props, ref) => {
  return (
    <button ref={ref} style={props.style}>
      <span className={'button-label'}>{props.label}</span>
    </button>
  );
});
const MeasureContainer = (props) => {
  const { ref } = useDimensions({
    polyfill: ResizeObserver,
    onResize: throttle(({ width }) => {
      //console.log(`MeasureContainer ${width}`);
      if (typeof props.onResize === 'function') {
        props.onResize(width);
      }
    }, 500),
  });
  return (
    <div ref={ref} id="MeasureExample">
      {props.children}
    </div>
  );
};

const buttons = ['1', '2', '3'];

const MeasureExample = () => {
  const [showButton, setShowButton] = React.useState({});
  const handleResize = (width) => {
    const toAdd = clone(buttons).reverse();
    const newShowButton = {};
    let remainingWidth = width - OTHER_DIV_WIDTH;
    each(toAdd, (id) => {
      if (BUTTON_MAX_WIDTH < remainingWidth) {
        newShowButton[id] = true;
      }
      remainingWidth -= BUTTON_MAX_WIDTH;
    });
    setShowButton(newShowButton);
  };

  return (
    <MeasureContainer onResize={handleResize}>
      <div style={{ minWidth: OTHER_DIV_WIDTH }} />
      {showButton['1'] && <Button label={'Button One'} />}
      {showButton['2'] && <Button label={'Button Two'} />}
      {showButton['3'] && <Button label={'Button Three'} />}
    </MeasureContainer>
  );
};

export default MeasureExample;
