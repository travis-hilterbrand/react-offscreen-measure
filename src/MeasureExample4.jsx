import React, { forwardRef } from 'react';
import useChange from '@react-hook/change';
import useSize from '@react-hook/size';
import { clone } from 'lodash-es';

import './MeasureExample4.scss';
import Portal from './Portal';

const Button = forwardRef((props, ref) => {
  return (
    <button ref={ref} id={props.id} style={props.style}>
      <span className={'button-label'}>{props.label}</span>
    </button>
  );
});
const MeasureButton = (props) => {
  const ref = React.useRef(null);
  const [width] = useSize(ref);
  const visibility = width > 0 ? undefined : 'hidden';
  const { id, onResize } = props;
  useChange(width, (current) => {
    if (typeof onResize === 'function') {
      onResize(id, ref.current.getBoundingClientRect().width);
    }
  });
  return <Button ref={ref} {...props} style={{ visibility }} />;
};

const MeasureExample = () => {
  const [buttonSizes, setButtonSizes] = React.useState({});
  const handleResize = (id, width) => {
    console.log(`handleResize(${id}, ${width})`);
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
