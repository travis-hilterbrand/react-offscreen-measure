import React, { forwardRef } from 'react';

const Button = forwardRef((props, ref) => {
  return (
    <button>
      <span className={'button-label'}>{props.label}</span>
    </button>
  );
});

const TestComponent = () => {
  return (
    <div className="test-component">
      <div style={{ minWidth: 200 }} />
      <Button label={'Button One'} />
      <Button label={'Button Two'} />
      <Button label={'Button Three'} />
    </div>
  );
};

export default TestComponent;
