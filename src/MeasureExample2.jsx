import React, { forwardRef } from 'react';
import useDimensions from 'react-cool-dimensions';
import { ResizeObserver } from '@juggle/resize-observer';
import { clone } from 'lodash-es';

import './MeasureExample2.scss';
import Portal from './Portal';

const Button = forwardRef((props, ref) => {
  return (
    <button ref={ref} style={props.style}>
      <span className={'button-label'}>{props.label}</span>
    </button>
  );
});
const MeasureButton = (props) => {
  const { ref, width } = useDimensions({
    polyfill: ResizeObserver,
    useBorderBoxSize: false,
    onResize: ({ width }) => {
      if (typeof props.onResize === 'function') {
        props.onResize(props.id, width, ref.current.getBoundingClientRect().width);
      }
    },
  });
  const visibility = width > 0 ? undefined : 'hidden';
  return <Button ref={ref} {...props} style={{ visibility }} />;
};

const MeasureExample = () => {
  const [buttonSizes, setButtonSizes] = React.useState({});
  const handleResize = (id, width, clientWidth) => {
    const widthAndPadding = width + 16 * 2;
    console.log(`handleResize(${id}, ${widthAndPadding}, ${clientWidth})`);
    const newButtonSizes = clone(buttonSizes);
    newButtonSizes[id] = width;
    setButtonSizes(newButtonSizes);
  };
  return (
    <div id="MeasureExample">
      <div style={{ minWidth: 200 }} />
      {buttonSizes['1'] && <MeasureButton id={'1'} label={'Button One'} />}
      {buttonSizes['2'] && <MeasureButton id={'2'} label={'Button Two'} />}
      {buttonSizes['3'] && <MeasureButton id={'3'} label={'Button Three'} />}
      <Portal>
        <div style={{ visibility: 'hidden' }}>
          <MeasureButton id={'1'} label={'Button One'} onResize={handleResize} />
          <MeasureButton id={'2'} label={'Button Two'} onResize={handleResize} />
          <MeasureButton id={'3'} label={'Button Three'} onResize={handleResize} />
        </div>
      </Portal>
    </div>
  );
};

export default MeasureExample;
