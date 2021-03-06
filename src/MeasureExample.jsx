import React, { forwardRef } from 'react';
import useDimensions from 'react-cool-dimensions';
import { ResizeObserver } from '@juggle/resize-observer';

import './MeasureExample.scss';

const Button = forwardRef((props, ref) => {
  return (
    <button ref={ref} style={props.style}>
      <span className={'button-label'}>{props.label}</span>
    </button>
  );
});
const MeasureButton = (props) => {
  const { ref, width, height, entry, unobserve, observe } = useDimensions({
    polyfill: ResizeObserver,
    onResize: ({ width, height, entry, unobserve, observe }) => {
      console.log('MeasureButton', {
        width,
        height,
      });
    },
  });
  const visibility = width > 0 ? undefined : 'hidden';
  return <Button ref={ref} {...props} style={{ visibility }} />;
};

const MeasureExample = () => {
  return (
    <div id="MeasureExample">
      <div style={{ minWidth: 200 }} />
      <MeasureButton label={'Button One'} />
      <MeasureButton label={'Button Two'} />
      <MeasureButton label={'Button Three'} />
    </div>
  );
};

export default MeasureExample;
