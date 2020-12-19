import React, { forwardRef } from 'react';
import useChange from '@react-hook/change';
import useSize from '@react-hook/size';
import { clone } from 'lodash-es';

import './MeasureExample5.scss';

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
  const { id, onResize } = props;
  useChange(width, (current) => {
    if (typeof onResize === 'function') {
      onResize(id, ref.current.getBoundingClientRect().width);
    }
  });
  return <Button ref={ref} {...props} />;
};

const MeasureExample = () => {
  const [buttonWidth, setButtonWidth] = React.useState(0);
  const handleResize = (id, width) => {
    console.log(`handleResize(${id}, ${width})`);
    setButtonWidth(width);
  };
  return (
    <div id="MeasureExample">
      <div style={{ minWidth: 200 }} />
      {<MeasureButton id={'1'} label={'My Button'} onResize={handleResize} />}
      <span>{buttonWidth}</span>
    </div>
  );
};

export default MeasureExample;
